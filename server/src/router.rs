use axum::{
    extract::{Path, Query},
    routing::get,
    Router,
};
use serde::{Deserialize, Serialize};

use super::services::movies;
use crate::services::country;

pub fn init_router() -> Router {
    Router::new()
        .route("/", get(hello_world))
        .nest("/api", api())
        .route("/fetch", get(fetch_pagination))
        .route("/greet/:name", get(greet_path))
        .merge(ping())
        .nest("/nest", nest())
    // .route("/*", get(|| async { "404" }))
}

fn api() -> Router {
    Router::new()
        .nest("/country", country::country_services())
        .nest("/movies", movies::movie_services())
}

fn ping() -> Router {
    Router::new().route("/ping", get(|| async { "pingg" }))
}

fn nest() -> Router {
    Router::new()
        .route("/a", get(|| async { "a" }))
        .route("/b", get(|| async { "b" }))
}

async fn greet_path(Path(name): Path<String>) -> String {
    format!("Hello, {}!", name)
}

async fn hello_world() -> &'static str {
    "Hello, world!"
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
struct Pagination {
    page: Option<String>,
    per_page: Option<String>,
}
async fn fetch_pagination(Query(params): Query<Pagination>) -> String {
    let page = params.page.unwrap_or("1".to_string());
    let per_page = params.per_page.unwrap_or("10".to_string());

    return format!("page: {}, per_page: {}", page, per_page);
}
