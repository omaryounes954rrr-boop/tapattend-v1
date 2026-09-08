import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # ✅ Railway provides DATABASE_URL automatically
    # SQLAlchemy 2.0 handles postgresql:// natively
    # If Railway gives postgres://, we convert it:
    database_url: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./tapattend_v1.db"
    )
    
    # Auto-convert postgres:// to postgresql:// if needed
    _fix_postgres_prefix: bool = os.getenv("DATABASE_URL", "").startswith("postgres://") if os.getenv("DATABASE_URL") else False

    jwt_secret: str = os.getenv("JWT_SECRET", "dev-secret-change-me")
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24 * 7
    duplicate_scan_seconds: int = int(os.getenv("DUPLICATE_SCAN_SECONDS", "30"))
    cors_origins: str = os.getenv(
        "CORS_ORIGINS", 
        "http://localhost:5173,http://127.0.0.1:5173"
    )


settings = Settings()