// Windows のリリースビルドで余計なコンソールを出さない（テンプレート既定）
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tsumugi_lib::run()
}
