use std::sync::{Arc, atomic::{AtomicU32, Ordering}};

#[derive(Clone)]
pub struct AppState {
    counter: Arc<AtomicU32>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            counter: Arc::new(AtomicU32::new(0)),
        }
    }

    pub fn increment(&self) -> u32 {
        self.counter.fetch_add(1, Ordering::SeqCst) + 1
    }
}
