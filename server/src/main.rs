use axum::Extension;

mod db;
mod router;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    println!("Hello, world!");
    let router = router::init_router();

    let conn_pool = db::init_db().await;
    let router = router.layer(Extension(conn_pool.clone()));

    let countries = sqlx::query!("SELECT country_name, country_id FROM country",)
        .fetch_all(&conn_pool) // -> Vec<{ country: String, count: i64 }>
        .await
        .unwrap();
    countries.iter().for_each(|country| {
        println!("country: {:?}", country);
    });

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    axum::serve(listener, router).await.unwrap();
}
