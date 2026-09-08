from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User


def get_current_user(db: Session = Depends(get_db)) -> User:
    """Get the current authenticated user from the database."""
    # This is a placeholder - in production, this would validate
    # the token/session and return the user
    # For now, we return None which will cause a 401 error
    raise HTTPException(status_code=401, detail="Authentication required")


def require_roles(*allowed_roles):
    """Dependency that checks if the user has required roles.
    In practice, this would be used with FastAPI's `Depends()`.
    """

    def role_checker(current_user: User = Depends(get_current_user)):
        if not current_user:
            raise HTTPException(status_code=401, detail="Authentication required")
        if not any(role in allowed_roles for role in current_user.role.split(",")):
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return current_user

    return role_checker