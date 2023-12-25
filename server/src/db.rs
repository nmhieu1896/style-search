use sqlx::{postgres::PgPoolOptions, PgPool};

pub async fn init_db() -> PgPool {
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Can't connect to database")
}
