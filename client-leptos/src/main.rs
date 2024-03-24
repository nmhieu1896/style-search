use leptos::*;

mod app;
use app::App;

fn main() {
    _ = console_log::init_with_level(log::Level::Debug);
    logging::log!("csr mode - mounting to body");

    mount_to_body(|| {
        view! { <App /> }
    })
}
