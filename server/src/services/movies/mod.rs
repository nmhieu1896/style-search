use axum::{routing::get, Router};

mod handler;

pub fn movie_services() -> Router {
    Router::new()
        .route("/", get(handler::get_movies))
        .route("/:id", get(handler::get_movie_by_id))
}
