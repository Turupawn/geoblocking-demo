use std::{env, net::SocketAddr};

use tracing_subscriber::{EnvFilter, fmt};

mod handlers;
mod router;
mod state;

#[tokio::main]
async fn main() {
    fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    let state = state::AppState::new();
    let app = router::create_router(state);

    let port = env::var("PORT")
        .ok()
        .and_then(|value| value.parse::<u16>().ok())
        .unwrap_or(3001);
    let addr: SocketAddr = format!("0.0.0.0:{port}").parse().expect("invalid bind addr");
    tracing::info!(%addr, "geoblocking poc backend listening");

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("failed to bind");

    axum::serve(listener, app).await.expect("server error");
}
