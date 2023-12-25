use axum::Extension;

pub mod db;
pub mod router;
pub mod services;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    println!("Hello, world!");

    let router = router::init_router();
    let db_pool = db::init_db().await;
    let router = router.layer(Extension(db_pool));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    axum::serve(listener, router).await.unwrap();
}
