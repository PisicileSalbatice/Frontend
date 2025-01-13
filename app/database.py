from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from sqlalchemy.orm import registry
DATABASE_URL = "postgresql://postgres:student123@localhost/usv_exam_db"


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
mapper_registry = registry()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
def init_db():
    from app.models import Professor, Exam
    mapper_registry.configure()  # Configurează mapper-ul
    Base.metadata.create_all(bind=engine)