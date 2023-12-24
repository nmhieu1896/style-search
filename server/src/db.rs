use sqlx::{
    postgres::{PgPoolOptions, PgRow},
    PgPool,
};

pub async fn init_db() -> PgPool {
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Can't connect to database")
}

// async fn test_sql(connection_pool: &PgPool) -> Result<Vec<Movie>> {
//     all_movies(connection_pool).await?
// }

// struct Movie {
//     title: String,
// }

#[derive(sqlx::FromRow, Debug)]
struct Country {
    country_name: String,
    country_id: String,
}

// pub async fn all_movies(connection_pool: &PgPool) -> Result<Vec<Country>> {
// pub async fn all_movies(connection_pool: &PgPool) -> Result<PgRow> {
//     // let books = sqlx::query_as::<_, Movie>("SELECT * FROM books ORDER BY title,author")
//     //     .fetch_all(connection_pool)
//     //     .await?;

//     // sqlx::query!(
//     //     r#"
//     //         select * from country
//     //     "#,
//     // )
//     // .fetch_all(connection_pool)
//     // .await?

//     let data = sqlx::query("Select 1 + 1 as sum")
//         .fetch_one(connection_pool)
//         .await?;

//     let sum: i32 = data.get("sum");
//     return Ok(sum);
//     // Ok(books)
// }
