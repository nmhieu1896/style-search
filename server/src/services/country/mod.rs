use axum::{routing::get, Extension, Json, Router};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

pub fn country_services() -> Router {
    Router::new()
        .route("/", get(country))
        .route("/:id", get(|| async { "country ID" }))
}

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
struct Country {
    country_name: Option<String>,
    country_id: i32,
}
async fn country(Extension(conn): Extension<PgPool>) -> Json<Vec<Country>> {
    let records = sqlx::query!("SELECT country_name, country_id FROM country",)
        .fetch_all(&conn)
        .await
        .unwrap();
    let countries = records
        .iter()
        .map(|record| Country {
            country_name: record.country_name.clone(),
            country_id: record.country_id.clone(),
        })
        .collect::<Vec<Country>>();

    return Json(countries);
}
