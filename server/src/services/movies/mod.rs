use axum::{extract::Query, routing::get, Extension, Json, Router};
use serde::{Deserialize, Serialize};
use sqlx::{
    prelude::FromRow,
    types::{chrono::NaiveDate, Decimal},
    PgPool,
};

pub fn movie_services() -> Router {
    Router::new()
        .route("/", get(movie))
        .route("/:id", get(|| async { "Movie ID" }))
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
struct Pagination {
    page: Option<i32>,
    per_page: Option<i32>,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default, FromRow)]
struct Movie {
    movie_id: i32,
    title: String,
    overview: Option<String>,
    homepage: Option<String>,
    tagline: Option<String>,
    vote_average: Option<Decimal>,
    vote_count: Option<i32>,
    release_date: Option<NaiveDate>,
    budget: Option<i32>,
    revenue: Option<i64>,
    runtime: Option<i32>,
    movie_status: Option<String>,
}
async fn movie(
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
