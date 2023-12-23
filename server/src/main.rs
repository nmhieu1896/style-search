use axum::{routing::get, Router};

#[tokio::main]
async fn main() {
    println!("Hello, world!");
    let router = init_router();

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    axum::serve(listener, router).await.unwrap();
}

fn init_router() -> Router {
    Router::new().route("/", get(hello_world))
    // .route("/do_something", get(do_something))
}

async fn hello_world() -> &'static str {
    "Hello, world!"
}
