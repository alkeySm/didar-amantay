"""Pydantic schemas for request validation and response serialization."""

from datetime import datetime
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field

VALID_GENRES = (
    "angime_novella",
    "povester",
    "romandar",
    "piesalar",
    "kosemsoz",
    "esseler",
    "olender",
    "kinoscenariyler",
    "korkem_filmder",
    "derekti_filmder",
    "telehabarlar",
)


class LoginRequest(BaseModel):
    username: str = Field(..., min_length=1, max_length=80)
    password: str = Field(..., min_length=1, max_length=200)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str


class AdminProfileResponse(BaseModel):
    username: str


class BookBase(BaseModel):
    slug: Optional[str] = None
    year: int = Field(..., ge=1950, le=2100)
    publisher: str = Field(default="", max_length=200)
    isbn: Optional[str] = Field(default=None, max_length=80)
    pages: Optional[int] = Field(default=None, ge=1, le=5000)
    genre: str = Field(default="romandar", max_length=64)
    cover_url: Optional[str] = Field(default=None, max_length=500)
    cover_color: str = Field(default="#2C3E35", max_length=32)
    pdf_url: Optional[str] = Field(default=None, max_length=500)
    is_featured: bool = False
    is_new: bool = False
    available_languages: List[str] = Field(default_factory=lambda: ["kk"])

    title_kk: str = Field(..., min_length=1, max_length=300)
    subtitle_kk: str = Field(default="", max_length=300)
    description_kk: str = Field(default="")
    excerpt_kk: str = Field(default="")

    title_ru: str = Field(default="", max_length=300)
    description_ru: str = Field(default="")
    title_en: str = Field(default="", max_length=300)
    description_en: str = Field(default="")

    translations: Dict[str, Any] = Field(default_factory=dict)


class BookCreate(BookBase):
    pass


class BookUpdate(BaseModel):
    slug: Optional[str] = None
    year: Optional[int] = Field(default=None, ge=1950, le=2100)
    publisher: Optional[str] = Field(default=None, max_length=200)
    isbn: Optional[str] = Field(default=None, max_length=80)
    pages: Optional[int] = Field(default=None, ge=1, le=5000)
    genre: Optional[str] = Field(default=None, max_length=64)
    cover_url: Optional[str] = Field(default=None, max_length=500)
    cover_color: Optional[str] = Field(default=None, max_length=32)
    pdf_url: Optional[str] = Field(default=None, max_length=500)
    is_featured: Optional[bool] = None
    is_new: Optional[bool] = None
    available_languages: Optional[List[str]] = None

    title_kk: Optional[str] = Field(default=None, min_length=1, max_length=300)
    subtitle_kk: Optional[str] = Field(default=None, max_length=300)
    description_kk: Optional[str] = None
    excerpt_kk: Optional[str] = None

    title_ru: Optional[str] = Field(default=None, max_length=300)
    description_ru: Optional[str] = None
    title_en: Optional[str] = Field(default=None, max_length=300)
    description_en: Optional[str] = None

    translations: Optional[Dict[str, Any]] = None


class BookResponse(BookBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    slug: str
    created_at: datetime


class WorkBase(BaseModel):
    genre: str = Field(..., max_length=64)
    year: Optional[int] = Field(default=None, ge=1950, le=2100)
    is_new: bool = False
    available_languages: List[str] = Field(default_factory=lambda: ["kk"])

    title_kk: str = Field(..., min_length=1, max_length=300)
    summary_kk: str = Field(default="")
    content_kk: str = Field(default="")

    title_ru: str = Field(default="", max_length=300)
    summary_ru: str = Field(default="")
    title_en: str = Field(default="", max_length=300)
    summary_en: str = Field(default="")

    translations: Dict[str, Any] = Field(default_factory=dict)
    external_url: Optional[str] = Field(default=None, max_length=500)


class WorkCreate(WorkBase):
    pass


class WorkUpdate(BaseModel):
    genre: Optional[str] = Field(default=None, max_length=64)
    year: Optional[int] = Field(default=None, ge=1950, le=2100)
    is_new: Optional[bool] = None
    available_languages: Optional[List[str]] = None
    title_kk: Optional[str] = Field(default=None, min_length=1, max_length=300)
    summary_kk: Optional[str] = None
    content_kk: Optional[str] = None
    title_ru: Optional[str] = Field(default=None, max_length=300)
    summary_ru: Optional[str] = None
    title_en: Optional[str] = Field(default=None, max_length=300)
    summary_en: Optional[str] = None
    translations: Optional[Dict[str, Any]] = None
    external_url: Optional[str] = Field(default=None, max_length=500)


class WorkResponse(WorkBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime


class QuoteCreate(BaseModel):
    category: Literal["oi", "metafora"] = "oi"
    text_kk: str = Field(..., min_length=1)
    text_ru: str = Field(default="")
    text_en: str = Field(default="")
    source_kk: str = Field(default="", max_length=300)
    translations: Dict[str, Any] = Field(default_factory=dict)


class QuoteResponse(QuoteCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


class PodcastCreate(BaseModel):
    episode_number: int = Field(default=1, ge=1)
    title_kk: str = Field(..., min_length=1, max_length=300)
    title_ru: str = Field(default="", max_length=300)
    title_en: str = Field(default="", max_length=300)
    description_kk: str = Field(default="")
    video_url: str = Field(default="https://teledidar.kz", max_length=500)
    duration: str = Field(default="42:00", max_length=32)
    published_date: str = Field(default="2026", max_length=64)


class PodcastResponse(PodcastCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


class GalleryCreate(BaseModel):
    image_url: str = Field(..., min_length=1, max_length=500)
    caption_kk: str = Field(..., min_length=1, max_length=400)
    caption_ru: str = Field(default="", max_length=400)
    caption_en: str = Field(default="", max_length=400)
    year: Optional[str] = Field(default=None, max_length=32)
    category: str = Field(default="archive", max_length=64)


class GalleryResponse(GalleryCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


class ReviewCreate(BaseModel):
    author_name: str = Field(..., min_length=2, max_length=150)
    author_role: Optional[str] = Field(default=None, max_length=150)
    book_title: Optional[str] = Field(default=None, max_length=250)
    rating: int = Field(default=5, ge=1, le=5)
    content: str = Field(..., min_length=4, max_length=3000)


class ReviewPatch(BaseModel):
    is_approved: bool


class ReviewResponse(ReviewCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    is_approved: bool
    created_at: datetime


class SiteOverviewResponse(BaseModel):
    books: List[BookResponse]
    works: List[WorkResponse]
    quotes: List[QuoteResponse]
    podcasts: List[PodcastResponse]
    gallery: List[GalleryResponse]
    reviews: List[ReviewResponse]
    stats: Dict[str, int]
