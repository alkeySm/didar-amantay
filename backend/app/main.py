"""FastAPI application entrypoint and REST API endpoints for Didar Amantay portal."""

import re
import uuid
from contextlib import asynccontextmanager
from pathlib import Path
from typing import List, Optional

from fastapi import Depends, FastAPI, File, HTTPException, Query, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from .auth import create_access_token, get_optional_admin, require_admin, verify_password
from .database import Base, SessionLocal, UPLOAD_DIR, engine, get_db
from .models import (
    AdminUser,
    Book,
    GalleryItem,
    PodcastEpisode,
    Quote,
    ReaderReview,
    Work,
)
from .schemas import (
    AdminProfileResponse,
    BookCreate,
    BookResponse,
    BookUpdate,
    GalleryCreate,
    GalleryResponse,
    LoginRequest,
    PodcastCreate,
    PodcastResponse,
    QuoteCreate,
    QuoteResponse,
    ReviewCreate,
    ReviewPatch,
    ReviewResponse,
    SiteOverviewResponse,
    TokenResponse,
    WorkCreate,
    WorkResponse,
    WorkUpdate,
)
from .seed import seed_database

ALLOWED_UPLOAD_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".svg", ".pdf"}
MAX_UPLOAD_BYTES = 25 * 1024 * 1024


def slugify_title(text: str) -> str:
    """Create a URL-safe slug from Cyrillic or Latin title."""
    translit = {
        "а": "a", "ә": "a", "б": "b", "в": "v", "г": "g", "ғ": "g", "д": "d",
        "е": "e", "ё": "e", "ж": "zh", "з": "z", "и": "i", "й": "y", "к": "k",
        "қ": "q", "л": "l", "м": "m", "н": "n", "ң": "ng", "о": "o", "ө": "o",
        "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ұ": "u", "ү": "u",
        "ф": "f", "х": "kh", "һ": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sh",
        "ы": "y", "і": "i", "э": "e", "ю": "yu", "я": "ya",
    }
    lowered = text.lower()
    mapped = "".join(translit.get(ch, ch) for ch in lowered)
    cleaned = re.sub(r"[^a-z0-9]+", "-", mapped).strip("-")
    return cleaned or f"book-{uuid.uuid4().hex[:8]}"


@asynccontextmanager
async def lifespan(_app: FastAPI):
    """Ensure database schema and initial literary content are ready on startup."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title="Didar Amantay Literary Portal API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://didaramantay.kz",
        "https://teledidar.kz",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")


@app.get("/api/health")
def health_check():
    """Service health endpoint."""
    return {"status": "ok"}


@app.post("/api/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate admin user and return Bearer JWT."""
    user = db.query(AdminUser).filter(AdminUser.username == payload.username).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Қате логин немесе құпиясөз / Invalid credentials",
        )
    token = create_access_token(user.username)
    return TokenResponse(access_token=token, username=user.username)


@app.get("/api/auth/me", response_model=AdminProfileResponse)
def auth_me(admin: AdminUser = Depends(require_admin)):
    """Verify current JWT and return admin username."""
    return AdminProfileResponse(username=admin.username)


@app.get("/api/site-overview", response_model=SiteOverviewResponse)
def site_overview(db: Session = Depends(get_db)):
    """Return aggregated portal data for initial SSR/client render."""
    books = db.query(Book).order_by(Book.is_featured.desc(), Book.year.desc(), Book.id.desc()).all()
    works = db.query(Work).order_by(Work.is_new.desc(), Work.year.desc(), Work.id.desc()).all()
    quotes = db.query(Quote).order_by(Quote.id.asc()).all()
    podcasts = db.query(PodcastEpisode).order_by(PodcastEpisode.episode_number.asc()).all()
    gallery = db.query(GalleryItem).order_by(GalleryItem.id.asc()).all()
    reviews = (
        db.query(ReaderReview)
        .filter(ReaderReview.is_approved.is_(True))
        .order_by(ReaderReview.created_at.desc(), ReaderReview.id.desc())
        .all()
    )
    return SiteOverviewResponse(
        books=books,
        works=works,
        quotes=quotes,
        podcasts=podcasts,
        gallery=gallery,
        reviews=reviews,
        stats={
            "books_count": len(books),
            "works_count": len(works),
            "languages_count": 14,
            "genres_count": 11,
        },
    )


# --- Books CRUD ---


@app.get("/api/books", response_model=List[BookResponse])
def list_books(
    lang: Optional[str] = Query(default=None),
    is_new: Optional[bool] = Query(default=None),
    genre: Optional[str] = Query(default=None),
    db: Session = Depends(get_db),
):
    """List books with optional filtering by translation language, new release flag, or genre."""
    query = db.query(Book)
    if is_new is not None:
        query = query.filter(Book.is_new.is_(is_new))
    if genre:
        query = query.filter(Book.genre == genre)
    books = query.order_by(Book.is_featured.desc(), Book.year.desc(), Book.id.desc()).all()
    if lang:
        books = [b for b in books if lang in (b.available_languages or [])]
    return books


@app.get("/api/books/{book_id}", response_model=BookResponse)
def get_book(book_id: int, db: Session = Depends(get_db)):
    """Fetch a single book by ID."""
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@app.post("/api/books", response_model=BookResponse, status_code=status.HTTP_201_CREATED)
def create_book(
    payload: BookCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Create a new book record (Admin only)."""
    data = payload.model_dump()
    base_slug = slugify_title(data.get("slug") or data["title_kk"])
    slug = base_slug
    counter = 2
    while db.query(Book).filter(Book.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1
    data["slug"] = slug

    if not data.get("available_languages"):
        data["available_languages"] = ["kk"]
    elif "kk" not in data["available_languages"]:
        data["available_languages"] = ["kk", *data["available_languages"]]

    book = Book(**data)
    db.add(book)
    db.commit()
    db.refresh(book)
    return book


@app.put("/api/books/{book_id}", response_model=BookResponse)
def update_book(
    book_id: int,
    payload: BookUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Update an existing book record (Admin only)."""
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    updates = payload.model_dump(exclude_unset=True)
    for key, val in updates.items():
        setattr(book, key, val)

    db.commit()
    db.refresh(book)
    return book


@app.delete("/api/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(
    book_id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Delete a book record (Admin only)."""
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(book)
    db.commit()
    return None


# --- Works CRUD ---


@app.get("/api/works", response_model=List[WorkResponse])
def list_works(
    genre: Optional[str] = Query(default=None),
    is_new: Optional[bool] = Query(default=None),
    lang: Optional[str] = Query(default=None),
    db: Session = Depends(get_db),
):
    """List creative works across all 11 literary/cinema genres."""
    query = db.query(Work)
    if genre:
        query = query.filter(Work.genre == genre)
    if is_new is not None:
        query = query.filter(Work.is_new.is_(is_new))
    works = query.order_by(Work.is_new.desc(), Work.year.desc(), Work.id.desc()).all()
    if lang:
        works = [w for w in works if lang in (w.available_languages or [])]
    return works


@app.post("/api/works", response_model=WorkResponse, status_code=status.HTTP_201_CREATED)
def create_work(
    payload: WorkCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Add a creative work under any of the 11 genres (Admin only)."""
    work = Work(**payload.model_dump())
    db.add(work)
    db.commit()
    db.refresh(work)
    return work


@app.put("/api/works/{work_id}", response_model=WorkResponse)
def update_work(
    work_id: int,
    payload: WorkUpdate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Update an existing creative work (Admin only)."""
    work = db.query(Work).filter(Work.id == work_id).first()
    if not work:
        raise HTTPException(status_code=404, detail="Work not found")
    for key, val in payload.model_dump(exclude_unset=True).items():
        setattr(work, key, val)
    db.commit()
    db.refresh(work)
    return work


@app.delete("/api/works/{work_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_work(
    work_id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Delete a creative work (Admin only)."""
    work = db.query(Work).filter(Work.id == work_id).first()
    if not work:
        raise HTTPException(status_code=404, detail="Work not found")
    db.delete(work)
    db.commit()
    return None


# --- Quotes & Metaphors ---


@app.get("/api/quotes", response_model=List[QuoteResponse])
def list_quotes(category: Optional[str] = Query(default=None), db: Session = Depends(get_db)):
    """List thoughts (Ойлары) and metaphors (Метафоралары)."""
    query = db.query(Quote)
    if category:
        query = query.filter(Quote.category == category)
    return query.order_by(Quote.id.asc()).all()


@app.post("/api/quotes", response_model=QuoteResponse, status_code=status.HTTP_201_CREATED)
def create_quote(
    payload: QuoteCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Add a quote or metaphor (Admin only)."""
    quote = Quote(**payload.model_dump())
    db.add(quote)
    db.commit()
    db.refresh(quote)
    return quote


@app.delete("/api/quotes/{quote_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_quote(
    quote_id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Delete a quote or metaphor (Admin only)."""
    quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    db.delete(quote)
    db.commit()
    return None


# --- Teledidar.kz Podcasts ---


@app.get("/api/podcasts", response_model=List[PodcastResponse])
def list_podcasts(db: Session = Depends(get_db)):
    """List teledidar.kz podcast episodes."""
    return db.query(PodcastEpisode).order_by(PodcastEpisode.episode_number.asc()).all()


@app.post("/api/podcasts", response_model=PodcastResponse, status_code=status.HTTP_201_CREATED)
def create_podcast(
    payload: PodcastCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Add a teledidar.kz podcast episode (Admin only)."""
    ep = PodcastEpisode(**payload.model_dump())
    db.add(ep)
    db.commit()
    db.refresh(ep)
    return ep


@app.delete("/api/podcasts/{episode_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_podcast(
    episode_id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Delete a podcast episode (Admin only)."""
    ep = db.query(PodcastEpisode).filter(PodcastEpisode.id == episode_id).first()
    if not ep:
        raise HTTPException(status_code=404, detail="Episode not found")
    db.delete(ep)
    db.commit()
    return None


# --- Photo Gallery ---


@app.get("/api/gallery", response_model=List[GalleryResponse])
def list_gallery(db: Session = Depends(get_db)):
    """List photo gallery entries."""
    return db.query(GalleryItem).order_by(GalleryItem.id.asc()).all()


@app.post("/api/gallery", response_model=GalleryResponse, status_code=status.HTTP_201_CREATED)
def create_gallery_item(
    payload: GalleryCreate,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Add a photo gallery item (Admin only)."""
    item = GalleryItem(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@app.delete("/api/gallery/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gallery_item(
    item_id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Delete a gallery item (Admin only)."""
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    db.delete(item)
    db.commit()
    return None


# --- Reader Reviews ---


@app.get("/api/reviews", response_model=List[ReviewResponse])
def list_reviews(
    all: bool = Query(default=False),
    admin: Optional[AdminUser] = Depends(get_optional_admin),
    db: Session = Depends(get_db),
):
    """List reader reviews; non-admins only see approved reviews."""
    query = db.query(ReaderReview)
    if not (all and admin):
        query = query.filter(ReaderReview.is_approved.is_(True))
    return query.order_by(ReaderReview.created_at.desc(), ReaderReview.id.desc()).all()


@app.post("/api/reviews", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(payload: ReviewCreate, db: Session = Depends(get_db)):
    """Submit a public reader review."""
    review = ReaderReview(**payload.model_dump(), is_approved=True)
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


@app.patch("/api/reviews/{review_id}", response_model=ReviewResponse)
def patch_review(
    review_id: int,
    payload: ReviewPatch,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Approve or hide a reader review (Admin only)."""
    review = db.query(ReaderReview).filter(ReaderReview.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.is_approved = payload.is_approved
    db.commit()
    db.refresh(review)
    return review


@app.delete("/api/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    _: AdminUser = Depends(require_admin),
):
    """Delete a reader review (Admin only)."""
    review = db.query(ReaderReview).filter(ReaderReview.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    db.delete(review)
    db.commit()
    return None


# --- Media & PDF Upload ---


@app.post("/api/upload")
async def upload_file(
    file: UploadFile = File(...),
    _: AdminUser = Depends(require_admin),
):
    """Upload a book cover image or PDF excerpt/edition (Admin only)."""
    original_name = file.filename or "upload"
    ext = Path(original_name).suffix.lower()
    if ext not in ALLOWED_UPLOAD_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file extension '{ext}'. Allowed: {', '.join(sorted(ALLOWED_UPLOAD_EXTENSIONS))}",
        )

    content = await file.read()
    if len(content) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File exceeds 25 MB limit",
        )

    saved_name = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOAD_DIR / saved_name
    dest.write_bytes(content)

    return {"url": f"/uploads/{saved_name}", "filename": original_name}
