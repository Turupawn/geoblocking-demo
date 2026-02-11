use axum::{Json, extract::State, http::HeaderMap};
use rand::random;
use serde::Serialize;

use crate::state::AppState;

const RESTRICTED_COUNTRIES: [&str; 3] = ["US", "KP", "IR"];

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RandomResponse {
    value: u32,
    geo: GeoContext,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GeoContext {
    country: String,
    is_restricted: bool,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct IncrementResponse {
    count: u32,
}

pub async fn get_random(headers: HeaderMap) -> Json<RandomResponse> {
    let country = headers
        .get("cf-ipcountry")
        .and_then(|value| value.to_str().ok())
        .unwrap_or("unknown")
        .to_uppercase();

    let is_restricted = RESTRICTED_COUNTRIES.iter().any(|code| code == &country);

    Json(RandomResponse {
        value: random::<u32>(),
        geo: GeoContext {
            country,
            is_restricted,
        },
    })
}

pub async fn post_increment(State(state): State<AppState>) -> Json<IncrementResponse> {
    let count = state.increment();
    Json(IncrementResponse { count })
}
