from fastapi import FastAPI
from .routers import auth, students, professors, exams, classrooms
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  # Permite toate metodele (GET, POST, etc.)
    allow_headers=["*"],  # Permite toate headerele
)

app.include_router(auth.router)
app.include_router(students.router)
app.include_router(professors.router)
app.include_router(exams.router)
app.include_router(classrooms.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to USV Exam Planner API"}
