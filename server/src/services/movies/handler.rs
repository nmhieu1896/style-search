use axum::{
    extract::{Path, Query},
    Extension, Json,
};
use serde::{Deserialize, Serialize};
use sqlx::{
    prelude::FromRow,
    types::{chrono::NaiveDate, Decimal},
    PgPool,
};

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Pagination {
    page: Option<i32>,
    per_page: Option<i32>,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default, FromRow)]
pub struct Movie {
    #[serde(rename(serialize = "id", deserialize = "movie_id"))]
    movie_id: i32,
    title: String,
    overview: Option<String>,
    homepage: Option<String>,
    tagline: Option<String>,
    #[serde(rename(serialize = "voteAverage", deserialize = "vote_average"))]
    vote_average: Option<Decimal>,
    #[serde(rename(serialize = "voteCount", deserialize = "vote_count"))]
    vote_count: Option<i32>,
    #[serde(rename(serialize = "releaseDate", deserialize = "release_date"))]
    release_date: Option<NaiveDate>,
    budget: Option<i32>,
    revenue: Option<i64>,
    runtime: Option<i32>,
    #[serde(rename(serialize = "movieStatus", deserialize = "movie_status"))]
    movie_status: Option<String>,
}
pub async fn get_movies(
    Extension(conn): Extension<PgPool>,
    Query(params): Query<Pagination>,
) -> Json<Vec<Movie>> {
    let page = params.page.unwrap_or(1);
    let per_page = params.per_page.unwrap_or(10);

    let movies = sqlx::query_as::<_, Movie>("SELECT * FROM movies.movie offset $1 limit $2")
        .bind((page - 1) * per_page)
        .bind(per_page)
        .fetch_all(&conn)
        .await
        .unwrap();

    return Json(movies);
}

pub async fn get_movie_by_id(
    Extension(conn): Extension<PgPool>,
    Path(id): Path<i32>,
) -> Json<Movie> {
    let movie = sqlx::query_as::<_, Movie>("SELECT * FROM movies.movie where movie_id = $1")
        .bind(id)
        .fetch_one(&conn)
        .await
        .unwrap();

    return Json(movie);
}
