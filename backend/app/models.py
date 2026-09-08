from datetime import datetime, timedelta
from sqlalchemy import String, Boolean, DateTime, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(primary_key=True)
    full_name: Mapped[str]
    email: Mapped[str]
    role: Mapped[str]  # "hr" or "employee"
    org_id: Mapped[str]
    device_fingerprint: Mapped[str | None] = None
    created_at: Mapped[datetime | None] = None

    org: Mapped["Organization"] = relationship(back_populates="users")


class Organization(Base):
    __tablename__ = "organizations"

    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str]
    country: Mapped[str] = "EG"
    created_at: Mapped[datetime] = datetime.utcnow

    users: Mapped[list["User"]] = relationship(back_populates="org")


class AttendanceLog(Base):
    __tablename__ = "attendance_logs"

    id: Mapped[str] = mapped_column(primary_key=True)
    user_id: Mapped[str]
    point_id: Mapped[str]
    org_id: Mapped[str]
    event_type: Mapped[str]  # "in" or "out"
    scan_method: Mapped[str]  # "nfc" or "qr"
    recorded_at: Mapped[datetime]
    device_id: Mapped[str | None] = None
    latitude: Mapped[float | None] = None
    longitude: Mapped[float | None] = None

    user: Mapped["User"] = relationship()
    point: Mapped["CheckinPoint"] = relationship()


class CheckinPoint(Base):
    __tablename__ = "checkin_points"

    id: Mapped[str] = mapped_column(primary_key=True)
    org_id: Mapped[str]
    token_uid: Mapped[str]
    latitude: Mapped[float | None] = None
    longitude: Mapped[float | None] = None
    radius_meters: Mapped[int] = 30
    is_active: Mapped[Boolean] = True

    org: Mapped["Organization"] = relationship()