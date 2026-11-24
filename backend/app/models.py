"""SQLAlchemy 2.0 ORM models for Didar Amantay literary portal."""

from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from sqlalchemy import JSON, Boolean, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


def utc_now() -> datetime:
    """Return current UTC timestamp."""
    return datetime.now(timezone.utc)


class AdminUser(Base):
    """Administrator credentials for content and book management."""

    __tablename__ = "admin_users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(256), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)


class Book(Base):
    """Published book or multi-volume literary edition."""

    __tablename__ = "books"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True, nullable=False, index=True)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    publisher: Mapped[str] = mapped_column(String(200), nullable=False, default="")
    isbn: Mapped[Optional[str]] = mapped_column(String(80), nullable=True)
    pages: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    genre: Mapped[str] = mapped_column(String(64), nullable=False, default="romandar", index=True)
    cover_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    cover_color: Mapped[str] = mapped_column(String(32), nullable=False, default="#2C3E35")
    pdf_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_new: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    available_languages: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)

    title_kk: Mapped[str] = mapped_column(String(300), nullable=False)
    subtitle_kk: Mapped[str] = mapped_column(String(300), nullable=False, default="")
    description_kk: Mapped[str] = mapped_column(Text, nullable=False, default="")
    excerpt_kk: Mapped[str] = mapped_column(Text, nullable=False, default="")

    title_ru: Mapped[str] = mapped_column(String(300), nullable=False, default="")
    description_ru: Mapped[str] = mapped_column(Text, nullable=False, default="")
    title_en: Mapped[str] = mapped_column(String(300), nullable=False, default="")
    description_en: Mapped[str] = mapped_column(Text, nullable=False, default="")

    translations: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)


class Work(Base):
    """Creative work categorized under one of the 11 genres."""

    __tablename__ = "works"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    genre: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    is_new: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    available_languages: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)

    title_kk: Mapped[str] = mapped_column(String(300), nullable=False)
    summary_kk: Mapped[str] = mapped_column(Text, nullable=False, default="")
    content_kk: Mapped[str] = mapped_column(Text, nullable=False, default="")

    title_ru: Mapped[str] = mapped_column(String(300), nullable=False, default="")
    summary_ru: Mapped[str] = mapped_column(Text, nullable=False, default="")
    title_en: Mapped[str] = mapped_column(String(300), nullable=False, default="")
    summary_en: Mapped[str] = mapped_column(Text, nullable=False, default="")

    translations: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    external_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)


class Quote(Base):
    """Author thoughts (Ойлары) and literary metaphors (Метафоралары)."""

    __tablename__ = "quotes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    category: Mapped[str] = mapped_column(String(32), nullable=False, default="oi", index=True)
    text_kk: Mapped[str] = mapped_column(Text, nullable=False)
    text_ru: Mapped[str] = mapped_column(Text, nullable=False, default="")
    text_en: Mapped[str] = mapped_column(Text, nullable=False, default="")
    source_kk: Mapped[str] = mapped_column(String(300), nullable=False, default="")
    translations: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)


class PodcastEpisode(Base):
    """Teledidar.kz podcast and video conversation episode."""

    __tablename__ = "podcast_episodes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    episode_number: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    title_kk: Mapped[str] = mapped_column(String(300), nullable=False)
    title_ru: Mapped[str] = mapped_column(String(300), nullable=False, default="")
    title_en: Mapped[str] = mapped_column(String(300), nullable=False, default="")
    description_kk: Mapped[str] = mapped_column(Text, nullable=False, default="")
    video_url: Mapped[str] = mapped_column(String(500), nullable=False, default="https://teledidar.kz")
    duration: Mapped[str] = mapped_column(String(32), nullable=False, default="42:00")
    published_date: Mapped[str] = mapped_column(String(64), nullable=False, default="2026")


class GalleryItem(Base):
    """Archival and literary photo gallery entry."""

    __tablename__ = "gallery_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    image_url: Mapped[str] = mapped_column(String(500), nullable=False)
    caption_kk: Mapped[str] = mapped_column(String(400), nullable=False)
    caption_ru: Mapped[str] = mapped_column(String(400), nullable=False, default="")
    caption_en: Mapped[str] = mapped_column(String(400), nullable=False, default="")
    year: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    category: Mapped[str] = mapped_column(String(64), nullable=False, default="archive")


class ReaderReview(Base):
    """Reader and literary critic feedback (Оқырман пікірі)."""

    __tablename__ = "reader_reviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    author_name: Mapped[str] = mapped_column(String(150), nullable=False)
    author_role: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    book_title: Mapped[Optional[str]] = mapped_column(String(250), nullable=True)
    rating: Mapped[int] = mapped_column(Integer, nullable=False, default=5)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    is_approved: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
