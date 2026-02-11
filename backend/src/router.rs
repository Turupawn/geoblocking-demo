use axum::{Router, routing::{get, post}};
use tower_http::{cors::{Any, CorsLayer}, trace::TraceLayer};

use crate::handlers;
use crate::state::AppState;

pub fn create_router(state: AppState) -> Router {
    Router::new()
        .route("/api/random", get(handlers::geo::get_random))
        .route("/api/increment", post(handlers::geo::post_increment))
        .layer(CorsLayer::new().allow_origin(Any).allow_methods(Any).allow_headers(Any))
        .layer(TraceLayer::new_for_http())
        .with_state(state)
}
