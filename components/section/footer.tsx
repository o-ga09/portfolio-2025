export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 区切り線 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} azukiazusa.dev. All rights
            reserved.
            <br />
            このサイトは Google Analytics を使用しています。詳しくは{" "}
            <a href="https://policies.google.com/technologies/partner-sites?hl=ja">
              Google のサービスを使用するサイトやアプリから収集した情報の Google
              による使用 – ポリシーと規約
            </a>
            をご覧ください。
            <br />
            The Go gopher was designed by Renée French.
          </p>
        </div>
      </div>
    </footer>
  );
}
