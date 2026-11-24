"""Integration tests for Didar Amantay Literary Portal API."""

import os
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c


def test_health_and_overview(client: TestClient):
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}

    ov = client.get("/api/site-overview")
    assert ov.status_code == 200
    data = ov.json()
    assert len(data["books"]) >= 7
    assert len(data["works"]) >= 11
    assert len(data["quotes"]) >= 8
    assert len(data["podcasts"]) >= 4
    assert len(data["gallery"]) >= 4
    assert len(data["reviews"]) >= 4
    assert data["stats"]["languages_count"] == 14
    assert data["stats"]["genres_count"] == 11


def test_all_11_genres_present(client: TestClient):
    expected_genres = {
        "angime_novella", "povester", "romandar", "piesalar",
        "kosemsoz", "esseler", "olender", "kinoscenariyler",
        "korkem_filmder", "derekti_filmder", "telehabarlar",
    }
    res = client.get("/api/works")
    assert res.status_code == 200
    found = {item["genre"] for item in res.json()}
    assert expected_genres.issubset(found)


def test_admin_auth_and_book_crud(client: TestClient):
    # Unauthenticated creation must be rejected
    unauth = client.post("/api/books", json={"year": 2026, "title_kk": "Unauthorized"})
    assert unauth.status_code == 401

    username = os.getenv("ADMIN_USERNAME", "admin")
    password = os.getenv("ADMIN_PASSWORD", "didar2026")
    login = client.post("/api/auth/login", json={"username": username, "password": password})
    assert login.status_code == 200
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    me = client.get("/api/auth/me", headers=headers)
    assert me.status_code == 200
    assert me.json()["username"] == username

    # Create book
    create_res = client.post(
        "/api/books",
        headers=headers,
        json={
            "year": 2026,
            "publisher": "Тест баспасы",
            "pages": 210,
            "genre": "romandar",
            "cover_color": "#1E3A5F",
            "is_new": True,
            "available_languages": ["kk", "en", "fr"],
            "title_kk": "Тестілік роман",
            "subtitle_kk": "Жаңа туынды",
            "description_kk": "Тест сипаттамасы",
            "excerpt_kk": "Тест үзіндісі...",
            "title_en": "Test Novel",
            "description_en": "Test description",
        },
    )
    assert create_res.status_code == 201
    book_id = create_res.json()["id"]
    assert create_res.json()["title_kk"] == "Тестілік роман"

    # Update book
    upd_res = client.put(
        f"/api/books/{book_id}",
        headers=headers,
        json={"title_kk": "Жаңартылған тестілік роман", "pages": 250},
    )
    assert upd_res.status_code == 200
    assert upd_res.json()["title_kk"] == "Жаңартылған тестілік роман"
    assert upd_res.json()["pages"] == 250

    # Delete book
    del_res = client.delete(f"/api/books/{book_id}", headers=headers)
    assert del_res.status_code == 204
    assert client.get(f"/api/books/{book_id}").status_code == 404


def test_upload_and_review_submission(client: TestClient):
    username = os.getenv("ADMIN_USERNAME", "admin")
    password = os.getenv("ADMIN_PASSWORD", "didar2026")
    token = client.post("/api/auth/login", json={"username": username, "password": password}).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Upload SVG sample
    up = client.post(
        "/api/upload",
        headers=headers,
        files={"file": ("cover.svg", b'<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"/>', "image/svg+xml")},
    )
    assert up.status_code == 200
    uploaded_url = up.json()["url"]
    assert uploaded_url.startswith("/uploads/")
    uploaded_path = Path(__file__).resolve().parent.parent / uploaded_url.lstrip("/")
    assert uploaded_path.exists()
    uploaded_path.unlink(missing_ok=True)

    # Public review submission + cleanup
    rev = client.post(
        "/api/reviews",
        json={
            "author_name": "Айдос Серікұлы",
            "author_role": "Оқырман",
            "book_title": "Гүлдер мен кітаптар",
            "rating": 5,
            "content": "Тамаша философиялық шығарма, оқырманға терең ой салады.",
        },
    )
    assert rev.status_code == 201
    rev_id = rev.json()["id"]
    assert client.delete(f"/api/reviews/{rev_id}", headers=headers).status_code == 204
