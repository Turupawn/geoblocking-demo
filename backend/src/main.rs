use std::net::SocketAddr;

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

    let addr: SocketAddr = "0.0.0.0:3001".parse().expect("invalid bind addr");
    tracing::info!(%addr, "geoblocking poc backend listening");

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("failed to bind");

    axum::serve(listener, app).await.expect("server error");
}
