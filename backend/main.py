# Entratus Coding Challenge - Async Microservice (Weather Version - API Refactor for SPA)

# Tech stack:
# - FastAPI for API layer
# - httpx for async HTTP requests
# - pandas for transformation
# - SQLAlchemy + SQLite for optional storage
# - pytest for testing

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import pandas as pd
import httpx
import asyncio
from datetime import datetime, timezone

DATABASE_URL = "sqlite:///./weather.db"

Base = declarative_base()

class Weather(Base):
    __tablename__ = 'weather'
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String)
    temp = Column(Float)
    description = Column(String)
    location = Column(String)
    timestamp = Column(String)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/fetch_data")
async def fetch_data(
    lat: float = Query(25.2866, description="Latitude (default: Everglades National Park)"),
    lon: float = Query(-80.8987, description="Longitude (default: Everglades National Park)")
):
    return await get_forecast(lat, lon)


@app.get("/results")
async def results(limit: int = Query(10, ge=1, le=100)):
    return await get_logs(limit)


@app.get("/forecast")
async def get_forecast(lat: float = Query(...), lon: float = Query(...)):
    if not (-90 <= lat <= 90 and -180 <= lon <= 180):
        raise HTTPException(status_code=400, detail="Latitude must be between -90 and 90, and longitude between -180 and 180.")

    url = (
        f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}"
        f"&daily=temperature_2m_max,weathercode&temperature_unit=fahrenheit&timezone=auto"
    )

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json().get('daily')
            if not data:
                raise ValueError("No forecast data returned.")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to fetch data from weather API: {str(e)}")

    forecast = []
    db = SessionLocal()
    location_key = f"{lat},{lon}"
    timestamp = datetime.now(timezone.utc).isoformat()

    for date, temp, desc in zip(data['time'], data['temperature_2m_max'], data['weathercode']):
        forecast.append({"date": date, "temp": temp, "description": str(desc)})
        log_entry = Weather(date=date, temp=temp, description=str(desc), location=location_key, timestamp=timestamp)
        db.add(log_entry)

    db.commit()
    db.close()

    # pandas data transformation F to C
    
    df = pd.DataFrame(forecast)
    df["temperature_celsius"] = ((df["temp"] - 32) * 5 / 9).round(2)
    forecast = df.to_dict(orient="records")

    return {"forecast": forecast}

@app.get("/logs")
async def get_logs(limit: int = Query(10, ge=1, le=100)):
    db = SessionLocal()
    logs = db.query(Weather).order_by(Weather.timestamp.desc()).limit(limit).all()
    db.close()

    return {
        "logs": [
            {
                "date": entry.date,
                "temp": entry.temp,
                "description": entry.description,
                "location": entry.location,
                "timestamp": entry.timestamp
            } for entry in logs
        ]
    }