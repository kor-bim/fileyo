type LocaleKey = 'ko' | 'en' | 'ja' | 'zh-TW' | 'zh-CN' | 'es' | 'fr' | 'de' | 'pt-BR'

function localeKey(locale: string): LocaleKey {
  const key = locale as LocaleKey
  if (['ko', 'en', 'ja', 'zh-TW', 'zh-CN', 'es', 'fr', 'de', 'pt-BR'].includes(key)) {
    return key
  }
  return 'en'
}

type FooterLabels = {
  guide: string
  terms: string
  privacy: string
  dmca: string
}

const footerLabels: Record<LocaleKey, FooterLabels> = {
  ko: { guide: '가이드', terms: '이용약관', privacy: '개인정보처리방침', dmca: 'DMCA' },
  en: { guide: 'Guide', terms: 'Terms', privacy: 'Privacy', dmca: 'DMCA' },
  ja: { guide: 'ガイド', terms: '利用規約', privacy: 'プライバシー', dmca: 'DMCA' },
  'zh-TW': { guide: '指南', terms: '服務條款', privacy: '隱私權政策', dmca: 'DMCA' },
  'zh-CN': { guide: '指南', terms: '服务条款', privacy: '隐私政策', dmca: 'DMCA' },
  es: { guide: 'Guía', terms: 'Términos', privacy: 'Privacidad', dmca: 'DMCA' },
  fr: { guide: 'Guide', terms: 'Conditions', privacy: 'Confidentialité', dmca: 'DMCA' },
  de: { guide: 'Guide', terms: 'AGB', privacy: 'Datenschutz', dmca: 'DMCA' },
  'pt-BR': { guide: 'Guia', terms: 'Termos', privacy: 'Privacidade', dmca: 'DMCA' }
}

export function getFooterLabels(locale: string) {
  return footerLabels[localeKey(locale)]
}

type HomeInfo = {
  guideTitle: string
  paragraphs: [string, string]
  faqTitle: string
  faqItems: Array<{ q: string; a: string }>
}

const homeInfoByLocale: Record<LocaleKey, HomeInfo> = {
  ko: {
    guideTitle: '안전한 P2P 파일 공유 가이드',
    paragraphs: [
      'Fileyo는 업로드 파일을 서버에 장기 보관하지 않고 송신자와 수신자가 직접 연결되는 P2P 전송 구조를 사용합니다. 이 방식은 중간 저장 비용을 줄이고 빠른 전달에 유리하지만, 연결 품질은 양쪽 네트워크 상태와 브라우저 설정에 영향을 받습니다. 전송 안정성을 높이려면 절전 모드를 끄고, 가능한 동일한 와이파이 환경 또는 유선 네트워크를 사용하는 것이 좋습니다.',
      '보안을 위해 민감한 파일은 반드시 비밀번호를 설정하고, 공유 링크를 공개 채널에 올리지 마세요. 전송 완료 후에는 링크를 재사용하지 않고 폐기하는 것이 안전합니다. 실행 파일이나 압축 파일을 받을 때는 악성코드 검사와 파일 무결성 확인을 권장합니다. 연결이 끊기면 네트워크를 먼저 점검하고 동일 브라우저에서 방 링크를 다시 열어 재시도하세요.'
    ],
    faqTitle: 'FAQ',
    faqItems: [
      {
        q: '전송 중 연결이 끊기면 어떻게 하나요?',
        a: '송신자와 수신자 모두 페이지를 새로 열어 같은 링크로 재접속하세요. 절전 모드나 네트워크 전환이 원인인 경우가 많습니다.'
      },
      {
        q: '용량 제한이 있나요?',
        a: '서비스 정책과 브라우저 메모리 한도에 따라 체감 제한이 달라질 수 있습니다. 매우 큰 파일은 분할 전송을 권장합니다.'
      },
      {
        q: '서버에 파일이 저장되나요?',
        a: 'Fileyo는 P2P 전송을 기반으로 하며, 파일 본문의 장기 저장을 기본 동작으로 두지 않습니다.'
      }
    ]
  },
  en: {
    guideTitle: 'Safe P2P File Sharing Guide',
    paragraphs: [
      'Fileyo uses a peer-to-peer model where sender and receiver connect directly, instead of storing uploaded files for long periods on a central server. This can reduce storage overhead and speed up delivery, but transfer quality still depends on both network conditions and browser state. For better stability, disable sleep mode during transfer and use a stable Wi-Fi or wired connection when possible.',
      'For sensitive files, always set a password and avoid posting share links in public channels. After transfer completes, avoid reusing the same link. If you receive executable or compressed files, run malware checks and verify file integrity. If the connection drops, first check network status and reopen the room link in the same browser to reconnect.'
    ],
    faqTitle: 'FAQ',
    faqItems: [
      {
        q: 'What should I do if transfer disconnects?',
        a: 'Both sender and receiver should reopen the same room link and reconnect. Sleep mode or network switching is a common cause.'
      },
      {
        q: 'Is there a size limit?',
        a: 'The practical limit depends on browser memory and service policy. For very large files, splitting files is recommended.'
      },
      {
        q: 'Are files stored on the server?',
        a: 'Fileyo is built around P2P transfer and does not treat long-term server-side file storage as the default behavior.'
      }
    ]
  },
  ja: {
    guideTitle: '安全なP2Pファイル共有ガイド',
    paragraphs: [
      'Fileyoは送信者と受信者が直接接続するP2P方式を採用し、ファイル本文を長期保存しない設計です。中間保存コストを抑えやすい一方で、通信品質は双方のネットワーク状況やブラウザ状態に影響されます。',
      '機密ファイルは必ずパスワードを設定し、共有リンクを公開チャンネルに投稿しないでください。接続が切れた場合はネットワークを確認し、同じリンクを再度開いて再接続してください。'
    ],
    faqTitle: 'FAQ',
    faqItems: [
      { q: '転送が切断されたら？', a: '送信側と受信側の両方で同じリンクを開き直して再接続してください。' },
      {
        q: '容量制限はありますか？',
        a: '実効上の上限はブラウザメモリと運用ポリシーに依存します。大容量は分割推奨です。'
      },
      { q: 'サーバーに保存されますか？', a: 'FileyoはP2P転送を基本とし、長期保存を既定動作としていません。' }
    ]
  },
  'zh-TW': {
    guideTitle: '安全的 P2P 檔案分享指南',
    paragraphs: [
      'Fileyo 採用傳送方與接收方直接連線的 P2P 模式，預設不做長期集中儲存。此模式可降低中繼儲存成本，但實際傳輸品質仍會受到雙方網路與瀏覽器狀態影響。',
      '敏感檔案請務必設定密碼，不要在公開頻道張貼分享連結。若傳輸中斷，請先確認網路狀態，再重新開啟同一個房間連結。'
    ],
    faqTitle: 'FAQ',
    faqItems: [
      { q: '傳輸中斷怎麼辦？', a: '傳送方與接收方都重新開啟同一連結即可重新連線。' },
      { q: '有容量限制嗎？', a: '實務上會受瀏覽器記憶體與服務政策影響，大檔建議分割。' },
      { q: '檔案會存到伺服器嗎？', a: 'Fileyo 以 P2P 為主，預設不以伺服器長期保存為核心流程。' }
    ]
  },
  'zh-CN': {
    guideTitle: '安全的 P2P 文件分享指南',
    paragraphs: [
      'Fileyo 采用发送方与接收方直连的 P2P 模式，默认不做长期集中存储。该模式有助于降低中转存储成本，但传输质量仍会受到双方网络与浏览器状态影响。',
      '敏感文件请务必设置密码，不要在公开渠道发布分享链接。若传输中断，请先检查网络，再重新打开同一房间链接。'
    ],
    faqTitle: 'FAQ',
    faqItems: [
      { q: '传输中断怎么办？', a: '发送方和接收方都重新打开同一链接并重连。' },
      { q: '有大小限制吗？', a: '实际限制取决于浏览器内存和服务策略，大文件建议分片传输。' },
      { q: '文件会存到服务器吗？', a: 'Fileyo 以 P2P 为主，不以服务器长期存储为默认路径。' }
    ]
  },
  es: {
    guideTitle: 'Guía de uso seguro para compartir archivos P2P',
    paragraphs: [
      'Fileyo usa un modelo P2P donde emisor y receptor se conectan directamente, sin almacenar el contenido de forma prolongada en un servidor central.',
      'Para archivos sensibles, usa contraseña y evita publicar enlaces en canales públicos. Si se corta la conexión, revisa la red y vuelve a abrir el mismo enlace.'
    ],
    faqTitle: 'FAQ',
    faqItems: [
      {
        q: '¿Qué hago si se corta la transferencia?',
        a: 'Emisor y receptor deben abrir de nuevo el mismo enlace y reconectar.'
      },
      {
        q: '¿Hay límite de tamaño?',
        a: 'Depende de la memoria del navegador y la política del servicio; para archivos grandes, divide el contenido.'
      },
      {
        q: '¿Se guardan archivos en el servidor?',
        a: 'Fileyo prioriza transferencia P2P y no usa almacenamiento prolongado como flujo por defecto.'
      }
    ]
  },
  fr: {
    guideTitle: 'Guide de partage P2P sécurisé',
    paragraphs: [
      'Fileyo fonctionne en P2P direct entre expéditeur et destinataire, sans stockage central de longue durée par défaut.',
      'Pour les fichiers sensibles, activez un mot de passe et évitez les liens publics. En cas de coupure, vérifiez le réseau puis rouvrez le même lien.'
    ],
    faqTitle: 'FAQ',
    faqItems: [
      {
        q: 'Que faire si le transfert se coupe ?',
        a: 'Les deux côtés doivent rouvrir le même lien pour se reconnecter.'
      },
      {
        q: 'Y a-t-il une limite de taille ?',
        a: 'La limite pratique dépend de la mémoire navigateur et de la politique du service.'
      },
      {
        q: 'Les fichiers sont-ils stockés sur le serveur ?',
        a: 'Fileyo est centré sur le P2P et ne repose pas sur un stockage long par défaut.'
      }
    ]
  },
  de: {
    guideTitle: 'Sicheres P2P-Dateifreigabehandbuch',
    paragraphs: [
      'Fileyo nutzt ein direktes P2P-Modell zwischen Sender und Empfänger und speichert Inhalte standardmäßig nicht langfristig zentral.',
      'Für sensible Dateien bitte Passwort setzen und Links nicht öffentlich posten. Bei Abbruch Netzwerk prüfen und denselben Link erneut öffnen.'
    ],
    faqTitle: 'FAQ',
    faqItems: [
      {
        q: 'Was tun bei Verbindungsabbruch?',
        a: 'Sender und Empfänger sollten denselben Link neu öffnen und wieder verbinden.'
      },
      { q: 'Gibt es ein Größenlimit?', a: 'Das praktische Limit hängt von Browser-Speicher und Dienstregeln ab.' },
      {
        q: 'Werden Dateien auf dem Server gespeichert?',
        a: 'Fileyo setzt auf P2P und nicht auf langfristige Server-Speicherung als Standard.'
      }
    ]
  },
  'pt-BR': {
    guideTitle: 'Guia seguro de compartilhamento P2P',
    paragraphs: [
      'O Fileyo usa um modelo P2P com conexão direta entre remetente e destinatário, sem armazenamento central prolongado por padrão.',
      'Para arquivos sensíveis, use senha e evite publicar links em canais públicos. Se houver queda, verifique a rede e reabra o mesmo link.'
    ],
    faqTitle: 'FAQ',
    faqItems: [
      {
        q: 'O que fazer se a transferência cair?',
        a: 'Remetente e destinatário devem reabrir o mesmo link e reconectar.'
      },
      {
        q: 'Existe limite de tamanho?',
        a: 'O limite prático depende da memória do navegador e da política do serviço.'
      },
      {
        q: 'Os arquivos ficam no servidor?',
        a: 'O Fileyo prioriza P2P e não usa armazenamento longo como comportamento padrão.'
      }
    ]
  }
}

export function getHomeInfoContent(locale: string) {
  return homeInfoByLocale[localeKey(locale)]
}

type GuideLabels = {
  pageTitle: string
  pageDescription: string
  pageLead: string
  readMore: string
  backToList: string
}

const guideLabelsByLocale: Record<LocaleKey, GuideLabels> = {
  ko: {
    pageTitle: '파일 공유 가이드',
    pageDescription: 'P2P 파일 공유, 대용량 전송, 보안 수칙에 대한 상세 가이드 모음입니다.',
    pageLead: 'Fileyo 사용법, 전송 최적화, 보안 수칙을 정리한 문서입니다.',
    readMore: '자세히 보기',
    backToList: '← 가이드 목록'
  },
  en: {
    pageTitle: 'File Sharing Guide',
    pageDescription: 'Guides on P2P sharing, large file transfer, and secure file delivery.',
    pageLead: 'A collection of practical guides for using Fileyo safely and efficiently.',
    readMore: 'Read more',
    backToList: '← Back to guides'
  },
  ja: {
    pageTitle: 'ファイル共有ガイド',
    pageDescription: 'P2P共有・大容量転送・セキュア運用の実践ガイドです。',
    pageLead: 'Fileyoを安全かつ効率的に使うためのガイド集です。',
    readMore: '詳細を見る',
    backToList: '← ガイド一覧'
  },
  'zh-TW': {
    pageTitle: '檔案分享指南',
    pageDescription: '關於 P2P 分享、大檔傳輸與安全操作的實用指南。',
    pageLead: '整理 Fileyo 的使用方式、傳輸優化與安全建議。',
    readMore: '閱讀更多',
    backToList: '← 返回指南'
  },
  'zh-CN': {
    pageTitle: '文件分享指南',
    pageDescription: '关于 P2P 分享、大文件传输与安全使用的实用指南。',
    pageLead: '汇总 Fileyo 使用方法、传输优化与安全建议。',
    readMore: '阅读更多',
    backToList: '← 返回指南'
  },
  es: {
    pageTitle: 'Guía de Compartición',
    pageDescription: 'Guías prácticas sobre P2P, transferencia de archivos grandes y seguridad.',
    pageLead: 'Colección de guías para usar Fileyo de forma segura y eficiente.',
    readMore: 'Leer más',
    backToList: '← Volver a guías'
  },
  fr: {
    pageTitle: 'Guide de Partage',
    pageDescription: 'Guides pratiques sur le P2P, les gros fichiers et la sécurité.',
    pageLead: 'Ressources pour utiliser Fileyo de manière sûre et efficace.',
    readMore: 'Lire plus',
    backToList: '← Retour aux guides'
  },
  de: {
    pageTitle: 'Dateifreigabe-Guide',
    pageDescription: 'Praktische Guides zu P2P, großen Dateien und sicherem Teilen.',
    pageLead: 'Anleitungen für die sichere und effiziente Nutzung von Fileyo.',
    readMore: 'Mehr lesen',
    backToList: '← Zurück zu den Guides'
  },
  'pt-BR': {
    pageTitle: 'Guia de Compartilhamento',
    pageDescription: 'Guias práticos sobre P2P, arquivos grandes e segurança.',
    pageLead: 'Coleção para usar o Fileyo com segurança e eficiência.',
    readMore: 'Ler mais',
    backToList: '← Voltar aos guias'
  }
}

export function getGuideLabels(locale: string) {
  return guideLabelsByLocale[localeKey(locale)]
}

type LegalContent = {
  updatedLabel: string
  updatedAt: string
  terms: { title: string; description: string; paragraphs: [string, string, string] }
  privacy: { title: string; description: string; paragraphs: [string, string, string] }
  dmca: { title: string; description: string; paragraphs: [string, string, string] }
}

const legalByLocale: Record<LocaleKey, LegalContent> = {
  ko: {
    updatedLabel: '최종 수정일',
    updatedAt: '2026-02-15',
    terms: {
      title: '서비스 이용약관',
      description: 'Fileyo 서비스 이용약관',
      paragraphs: [
        'Fileyo는 사용자 간 파일 전달을 돕는 P2P 기반 서비스입니다. 사용자는 관련 법령을 준수해야 하며, 불법 콘텐츠 전송에 본 서비스를 이용할 수 없습니다.',
        '사용자는 자신이 공유하는 파일에 대한 권리와 책임을 가집니다. 저작권 침해, 악성코드 배포, 개인정보 유출 등 제3자 피해를 유발하는 행위는 금지됩니다.',
        '서비스 안정성과 보안을 위해 운영자는 필요한 범위에서 기능 제한, 접근 차단, 정책 변경을 할 수 있습니다. 약관 변경 시 사이트에 공지합니다.'
      ]
    },
    privacy: {
      title: '개인정보 처리방침',
      description: 'Fileyo 개인정보 처리방침',
      paragraphs: [
        'Fileyo는 파일 본문을 자체 저장소에 보관하지 않는 P2P 방식을 지향합니다. 다만 서비스 운영을 위해 접속 로그, 오류 로그, 최소한의 기술적 식별 정보가 일시적으로 처리될 수 있습니다.',
        '쿠키 또는 로컬 저장소는 세션 유지, 언어 선택, 전송 편의 기능 제공을 위해 사용될 수 있습니다. 사용자는 브라우저 설정으로 이를 삭제하거나 제한할 수 있습니다.',
        '법령에 근거한 요청이 있거나 서비스 보호 목적이 필요한 경우를 제외하고, 수집된 정보는 제3자에게 판매하지 않습니다. 문의는 공식 채널을 통해 접수할 수 있습니다.'
      ]
    },
    dmca: {
      title: '저작권 정책 (DMCA)',
      description: 'Fileyo 저작권 정책과 권리자 신고 절차',
      paragraphs: [
        'Fileyo는 저작권 침해를 허용하지 않습니다. 권리자의 허락 없이 보호된 콘텐츠를 공유하거나 배포하는 행위는 금지됩니다.',
        '권리 침해가 의심되는 경우, 권리자는 침해 대상, 원본 권리 정보, 연락처, 선의의 진술을 포함한 신고를 제출할 수 있습니다.',
        '확인된 위반 행위에 대해서는 접근 차단, 반복 위반 계정 또는 세션 제한 등 필요한 조치를 시행할 수 있습니다. 허위 신고는 법적 책임이 발생할 수 있습니다.'
      ]
    }
  },
  en: {
    updatedLabel: 'Last updated',
    updatedAt: '2026-02-15',
    terms: {
      title: 'Terms of Service',
      description: 'Fileyo Terms of Service',
      paragraphs: [
        'Fileyo is a P2P-based file-sharing service. Users must comply with applicable laws and must not use the service for illegal content distribution.',
        'Users are responsible for the rights and legality of files they share. Copyright infringement, malware distribution, and privacy violations are prohibited.',
        'To protect service stability and security, the operator may limit features, block access, or update policies when needed. Changes will be announced on the site.'
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'Fileyo Privacy Policy',
      paragraphs: [
        'Fileyo is designed for peer-to-peer transfer and does not use long-term centralized storage as the default flow for file contents.',
        'For operations and reliability, minimal technical information such as access logs and error logs may be processed temporarily.',
        'Cookies or local storage may be used for session continuity, language preference, and transfer usability. Except where required by law or security needs, collected data is not sold to third parties.'
      ]
    },
    dmca: {
      title: 'Copyright Policy (DMCA)',
      description: 'Fileyo copyright policy and takedown process',
      paragraphs: [
        'Fileyo does not permit copyright infringement. Sharing protected content without proper authorization is prohibited.',
        'If rights infringement is suspected, rights holders may submit a notice including the infringing material, ownership details, contact information, and a good-faith statement.',
        'Confirmed violations may result in link blocking, transfer restrictions, or repeat-offender controls. False reports may carry legal liability.'
      ]
    }
  },
  ja: {
    updatedLabel: '最終更新',
    updatedAt: '2026-02-15',
    terms: {
      title: '利用規約',
      description: 'Fileyo 利用規約',
      paragraphs: [
        'FileyoはP2Pベースのファイル共有サービスです。ユーザーは関連法令を遵守し、違法コンテンツ配布に利用してはいけません。',
        'ユーザーは共有するファイルの権利と適法性について責任を負います。著作権侵害、マルウェア配布、個人情報侵害は禁止です。',
        '安定運用と安全性のため、運営者は機能制限やアクセス制御、ポリシー更新を行う場合があります。変更はサイト上で告知します。'
      ]
    },
    privacy: {
      title: 'プライバシーポリシー',
      description: 'Fileyo プライバシーポリシー',
      paragraphs: [
        'FileyoはP2P転送を前提とし、ファイル本文の長期集中保存を既定動作としていません。',
        '運用と信頼性のため、アクセスログやエラーログなど最小限の技術情報を一時的に処理する場合があります。',
        'セッション維持や言語設定のためにCookie/ローカルストレージを利用することがあります。法令上必要な場合を除き第三者販売は行いません。'
      ]
    },
    dmca: {
      title: '著作権ポリシー (DMCA)',
      description: 'Fileyo 著作権ポリシーと申立手続き',
      paragraphs: [
        'Fileyoは著作権侵害を許容しません。正当な権限なく保護コンテンツを共有する行為は禁止です。',
        '権利侵害が疑われる場合、権利者は対象資料・権利情報・連絡先・誠実な申立文を提出できます。',
        '違反が確認された場合、リンク遮断や再発防止措置を実施することがあります。虚偽申立には法的責任が生じ得ます。'
      ]
    }
  },
  'zh-TW': {
    updatedLabel: '最後更新',
    updatedAt: '2026-02-15',
    terms: {
      title: '服務條款',
      description: 'Fileyo 服務條款',
      paragraphs: [
        'Fileyo 是以 P2P 為基礎的檔案分享服務。使用者必須遵守適用法規，且不得用於散布違法內容。',
        '使用者需對所分享檔案的權利與合法性負責。禁止著作權侵害、惡意程式散布與個資侵害。',
        '為維持服務穩定與安全，營運方可進行功能限制、存取管制與政策更新，並於網站公告。'
      ]
    },
    privacy: {
      title: '隱私權政策',
      description: 'Fileyo 隱私權政策',
      paragraphs: [
        'Fileyo 以 P2P 傳輸為主，預設不以長期集中儲存檔案內容為核心流程。',
        '為了營運與可靠性，可能暫時處理最小化技術資訊，如存取與錯誤記錄。',
        'Cookie 或本機儲存可能用於會話與語言設定。除法規要求外，不會將資料販售給第三方。'
      ]
    },
    dmca: {
      title: '著作權政策 (DMCA)',
      description: 'Fileyo 著作權政策與申訴流程',
      paragraphs: [
        'Fileyo 不容許著作權侵害。未經授權分享受保護內容屬禁止行為。',
        '若懷疑侵權，權利人可提交侵權內容、權利資訊、聯絡方式與善意聲明。',
        '確認違規後，平台可進行連結下架與重複違規管制。虛假申訴可能承擔法律責任。'
      ]
    }
  },
  'zh-CN': {
    updatedLabel: '最后更新',
    updatedAt: '2026-02-15',
    terms: {
      title: '服务条款',
      description: 'Fileyo 服务条款',
      paragraphs: [
        'Fileyo 是基于 P2P 的文件分享服务。用户必须遵守相关法律，不得用于传播违法内容。',
        '用户需对所分享文件的权利与合法性负责。禁止版权侵权、恶意软件传播和隐私侵害。',
        '为保障服务稳定与安全，平台可进行功能限制、访问管控和政策更新，并在站点公告。'
      ]
    },
    privacy: {
      title: '隐私政策',
      description: 'Fileyo 隐私政策',
      paragraphs: [
        'Fileyo 以 P2P 传输为主，默认不以长期集中存储文件内容作为核心流程。',
        '为保障运营与可靠性，可能临时处理最小化技术信息，如访问日志与错误日志。',
        'Cookie 或本地存储可用于会话和语言设置。除法律要求外，不会向第三方出售数据。'
      ]
    },
    dmca: {
      title: '版权政策 (DMCA)',
      description: 'Fileyo 版权政策与通知流程',
      paragraphs: [
        'Fileyo 不允许版权侵权。未经授权分享受保护内容属于禁止行为。',
        '如怀疑侵权，权利人可提交侵权材料、权利信息、联系方式及善意声明。',
        '确认违规后，平台可执行链接下架和重复违规限制。虚假投诉可能承担法律责任。'
      ]
    }
  },
  es: {
    updatedLabel: 'Última actualización',
    updatedAt: '2026-02-15',
    terms: {
      title: 'Términos del Servicio',
      description: 'Términos del servicio de Fileyo',
      paragraphs: [
        'Fileyo es un servicio de compartición de archivos basado en P2P. Los usuarios deben cumplir la ley y no usar el servicio para distribuir contenido ilegal.',
        'Los usuarios son responsables de los derechos y la legalidad de los archivos compartidos. Se prohíbe la infracción de copyright, malware y violaciones de privacidad.',
        'Para proteger la estabilidad y seguridad, el operador puede limitar funciones, bloquear accesos o actualizar políticas, con aviso en el sitio.'
      ]
    },
    privacy: {
      title: 'Política de Privacidad',
      description: 'Política de privacidad de Fileyo',
      paragraphs: [
        'Fileyo está diseñado para transferencia P2P y no usa almacenamiento central prolongado como flujo predeterminado.',
        'Por operación y confiabilidad, puede procesarse temporalmente información técnica mínima como registros de acceso y errores.',
        'Cookies o almacenamiento local pueden usarse para sesión e idioma. Salvo obligación legal, no se venden datos a terceros.'
      ]
    },
    dmca: {
      title: 'Política de Copyright (DMCA)',
      description: 'Política de copyright y proceso de aviso de Fileyo',
      paragraphs: [
        'Fileyo no permite infracciones de derechos de autor. Compartir contenido protegido sin autorización está prohibido.',
        'Si se sospecha infracción, el titular puede enviar aviso con material, datos de titularidad, contacto y declaración de buena fe.',
        'Si se confirma la infracción, pueden aplicarse bloqueos de enlaces y controles por reincidencia. Los reportes falsos pueden generar responsabilidad legal.'
      ]
    }
  },
  fr: {
    updatedLabel: 'Dernière mise à jour',
    updatedAt: '2026-02-15',
    terms: {
      title: "Conditions d'utilisation",
      description: "Conditions d'utilisation de Fileyo",
      paragraphs: [
        'Fileyo est un service de partage de fichiers basé sur le P2P. Les utilisateurs doivent respecter la loi et ne pas diffuser de contenu illégal.',
        "Les utilisateurs sont responsables des droits et de la légalité des fichiers partagés. Violation du droit d'auteur, malware et atteinte à la vie privée sont interdits.",
        'Pour la stabilité et la sécurité, l’opérateur peut limiter des fonctions, bloquer des accès ou mettre à jour les politiques avec annonce sur le site.'
      ]
    },
    privacy: {
      title: 'Politique de Confidentialité',
      description: 'Politique de confidentialité de Fileyo',
      paragraphs: [
        'Fileyo privilégie le transfert P2P et n’utilise pas le stockage central longue durée comme fonctionnement par défaut.',
        "Pour l'exploitation et la fiabilité, un minimum d'informations techniques (logs d'accès/erreurs) peut être traité temporairement.",
        'Les cookies ou le stockage local peuvent être utilisés pour la session et la langue. Sauf obligation légale, les données ne sont pas vendues à des tiers.'
      ]
    },
    dmca: {
      title: 'Politique de Copyright (DMCA)',
      description: 'Politique de copyright et procédure de signalement Fileyo',
      paragraphs: [
        "Fileyo n'autorise pas la violation du droit d'auteur. Le partage non autorisé de contenus protégés est interdit.",
        'En cas de suspicion, les ayants droit peuvent envoyer une notification avec contenu concerné, preuve de droit, contact et déclaration de bonne foi.',
        'En cas de violation confirmée, des blocages de liens et restrictions peuvent être appliqués. Les signalements abusifs peuvent engager une responsabilité légale.'
      ]
    }
  },
  de: {
    updatedLabel: 'Zuletzt aktualisiert',
    updatedAt: '2026-02-15',
    terms: {
      title: 'Nutzungsbedingungen',
      description: 'Fileyo Nutzungsbedingungen',
      paragraphs: [
        'Fileyo ist ein P2P-basierter Dateifreigabedienst. Nutzer müssen geltende Gesetze einhalten und dürfen keine illegalen Inhalte verbreiten.',
        'Nutzer sind für Rechte und Rechtmäßigkeit geteilter Dateien verantwortlich. Urheberrechtsverletzung, Malware-Verbreitung und Datenschutzverstöße sind untersagt.',
        'Zur Sicherung von Stabilität und Sicherheit kann der Betreiber Funktionen einschränken, Zugriffe blockieren oder Richtlinien aktualisieren.'
      ]
    },
    privacy: {
      title: 'Datenschutzerklärung',
      description: 'Fileyo Datenschutzerklärung',
      paragraphs: [
        'Fileyo ist auf P2P-Übertragung ausgelegt und nutzt keine langfristige zentrale Speicherung als Standardablauf.',
        'Für Betrieb und Zuverlässigkeit können minimale technische Informationen wie Zugriffs- und Fehlerprotokolle temporär verarbeitet werden.',
        'Cookies oder lokaler Speicher können für Sitzung und Sprache genutzt werden. Außer bei gesetzlicher Pflicht werden Daten nicht an Dritte verkauft.'
      ]
    },
    dmca: {
      title: 'Urheberrechtsrichtlinie (DMCA)',
      description: 'Fileyo Urheberrechtsrichtlinie und Meldungsprozess',
      paragraphs: [
        'Fileyo erlaubt keine Urheberrechtsverletzungen. Das Teilen geschützter Inhalte ohne Berechtigung ist verboten.',
        'Bei Verdacht können Rechteinhaber eine Meldung mit betroffenem Material, Rechteangaben, Kontakt und gutgläubiger Erklärung einreichen.',
        'Bei bestätigten Verstößen können Links gesperrt und Wiederholungstäter eingeschränkt werden. Falsche Meldungen können rechtliche Folgen haben.'
      ]
    }
  },
  'pt-BR': {
    updatedLabel: 'Última atualização',
    updatedAt: '2026-02-15',
    terms: {
      title: 'Termos de Serviço',
      description: 'Termos de serviço do Fileyo',
      paragraphs: [
        'Fileyo é um serviço de compartilhamento baseado em P2P. Usuários devem cumprir a legislação e não podem distribuir conteúdo ilegal.',
        'Usuários são responsáveis pelos direitos e pela legalidade dos arquivos compartilhados. Violação de copyright, malware e abuso de privacidade são proibidos.',
        'Para manter estabilidade e segurança, o operador pode limitar recursos, bloquear acesso ou atualizar políticas com aviso no site.'
      ]
    },
    privacy: {
      title: 'Política de Privacidade',
      description: 'Política de privacidade do Fileyo',
      paragraphs: [
        'Fileyo prioriza transferência P2P e não usa armazenamento central prolongado como fluxo padrão.',
        'Para operação e confiabilidade, informações técnicas mínimas, como logs de acesso e erro, podem ser processadas temporariamente.',
        'Cookies ou armazenamento local podem ser usados para sessão e idioma. Salvo obrigação legal, dados não são vendidos a terceiros.'
      ]
    },
    dmca: {
      title: 'Política de Copyright (DMCA)',
      description: 'Política de copyright e processo de denúncia do Fileyo',
      paragraphs: [
        'Fileyo não permite violação de direitos autorais. Compartilhar conteúdo protegido sem autorização é proibido.',
        'Em caso de suspeita, titulares podem enviar notificação com material, comprovação de direito, contato e declaração de boa-fé.',
        'Com violação confirmada, links podem ser bloqueados e reincidência pode sofrer restrições. Denúncias falsas podem gerar responsabilidade legal.'
      ]
    }
  }
}

export function getLegalContent(locale: string) {
  return legalByLocale[localeKey(locale)]
}

export interface LocalizedGuidePost {
  slug: string
  title: string
  description: string
  publishedAt: string
  sections: Array<{ heading: string; paragraphs: string[] }>
}

const koPosts: LocalizedGuidePost[] = [
  {
    slug: 'best-large-file-transfer-2026',
    title: '2026 대용량 파일 전송 방법 정리',
    description: '클라우드 업로드와 P2P 전송의 차이를 기준으로 상황별 전송 방식을 정리합니다.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '상황별 전송 방식 선택',
        paragraphs: [
          '대용량 파일 전송은 상대방이 즉시 받을 수 있는지, 파일 보관이 필요한지, 네트워크가 안정적인지를 먼저 확인해야 합니다.',
          '실시간 전달이 목적이라면 P2P가 빠르고 비용이 낮습니다. 장기 보관이나 링크 재사용이 필요하면 스토리지 기반 전송이 더 적합합니다.'
        ]
      },
      {
        heading: '전송 실패를 줄이는 체크리스트',
        paragraphs: [
          '전송 전 파일명을 정리하고 특수문자를 최소화하면 수신 환경에 따른 오류를 줄일 수 있습니다.',
          '공유기 환경에서는 브라우저 절전, 백그라운드 제한, 네트워크 전환을 피하는 것이 중요합니다.'
        ]
      }
    ]
  },
  {
    slug: 'p2p-vs-cloud-transfer',
    title: 'P2P 전송과 클라우드 전송의 차이',
    description: '속도, 보관성, 운영비 관점에서 두 방식을 비교합니다.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '속도와 지연',
        paragraphs: [
          'P2P는 송신자와 수신자가 직접 연결되므로 중간 업로드 단계가 없어 체감 속도가 빠를 수 있습니다.',
          '클라우드 방식은 업로드 후 다운로드 구조라 대기 시간이 늘지만, 반복 다운로드에는 유리합니다.'
        ]
      },
      {
        heading: '운영 관점',
        paragraphs: [
          'P2P는 서버 저장 비용이 낮지만, 동시 접속 품질과 연결 안정화 로직이 중요합니다.',
          '클라우드는 저장소 비용이 늘어도 접근 제어와 이력 관리가 쉬운 장점이 있습니다.'
        ]
      }
    ]
  },
  {
    slug: 'secure-p2p-file-sharing',
    title: '안전한 P2P 파일 공유 수칙',
    description: '비밀번호, 링크 관리, 파일 검증으로 사고를 줄이는 방법을 안내합니다.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '링크와 비밀번호 관리',
        paragraphs: [
          '공유 링크는 공개 채널에 그대로 올리지 말고 필요한 상대에게만 전달하세요.',
          '중요 파일은 반드시 방 비밀번호를 사용하고, 전송 완료 후 링크를 재사용하지 않는 것이 좋습니다.'
        ]
      },
      {
        heading: '파일 검증',
        paragraphs: [
          '수신 후 파일 해시를 비교하거나 백신 검사로 무결성과 악성코드 여부를 확인하세요.',
          '실행 파일은 별도 검증 없이 열지 말고 압축 파일 내부 구조도 함께 점검해야 합니다.'
        ]
      }
    ]
  },
  {
    slug: 'improve-transfer-speed',
    title: '파일 전송 속도 높이는 실전 팁',
    description: '와이파이 환경, 기기 상태, 브라우저 설정으로 전송 속도를 개선하는 방법입니다.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '네트워크 최적화',
        paragraphs: [
          '가능하면 5GHz 또는 유선 연결을 사용하고, 대역폭을 많이 쓰는 스트리밍 앱을 잠시 중지하세요.',
          '공유기와의 거리가 멀면 패킷 손실이 증가해 전송 속도가 급격히 떨어질 수 있습니다.'
        ]
      },
      {
        heading: '브라우저/기기 상태',
        paragraphs: [
          '브라우저 탭이 많거나 메모리가 부족하면 전송 처리량이 줄어듭니다.',
          '전송 중 절전 모드를 비활성화하고, 노트북 덮개를 닫지 않는 것이 안정적입니다.'
        ]
      }
    ]
  },
  {
    slug: 'when-transfer-disconnects',
    title: '전송 중 끊김이 발생할 때 대응법',
    description: '연결 끊김의 주요 원인과 재접속 시나리오를 단계별로 정리합니다.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '주요 원인 진단',
        paragraphs: [
          '가장 흔한 원인은 브라우저 백그라운드 제한, 모바일 네트워크 전환, 절전 진입입니다.',
          '연결이 자주 끊기면 동일 네트워크 재접속 후 방 링크를 다시 열어 세션을 새로 시작하세요.'
        ]
      },
      {
        heading: '재시도 전략',
        paragraphs: [
          '대용량 파일은 여러 파일로 분할하면 실패 시 전체 재전송 부담을 줄일 수 있습니다.',
          '중요 업무 파일은 전송 전후에 체크섬을 비교해 손상 여부를 확인하는 절차를 권장합니다.'
        ]
      }
    ]
  },
  {
    slug: 'team-file-sharing-playbook',
    title: '팀 단위 파일 공유 운영 가이드',
    description: '프로젝트 팀이 P2P 공유를 운영할 때 필요한 규칙을 제안합니다.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '운영 규칙',
        paragraphs: [
          '파일명 규칙, 버전 표기, 전송 완료 확인 절차를 팀 내 표준으로 정하면 재작업을 크게 줄일 수 있습니다.',
          '민감한 문서는 접근 범위를 최소화하고 만료 정책을 함께 운영해야 합니다.'
        ]
      },
      {
        heading: '책임 분리',
        paragraphs: [
          '송신자는 최신 파일 업로드와 암호 설정을 담당하고, 수신자는 무결성 검증과 보관 분류를 담당하는 식으로 역할을 나누세요.',
          '정기적으로 로그와 오류 케이스를 리뷰하면 보안과 품질을 동시에 개선할 수 있습니다.'
        ]
      }
    ]
  },
  {
    slug: 'browser-settings-for-stable-transfer',
    title: '브라우저 설정으로 전송 안정성 높이기',
    description: '백그라운드 제한과 권한 설정을 점검해 전송 끊김을 줄이는 방법입니다.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '브라우저 권한 점검',
        paragraphs: [
          '파일 전송이 자주 실패하면 먼저 브라우저의 사이트 권한과 팝업 차단 설정을 확인하세요.',
          '보안 확장 프로그램이 WebRTC 연결을 차단할 수 있으므로 전송 중에는 예외 설정을 두는 것이 도움이 됩니다.'
        ]
      },
      {
        heading: '백그라운드 동작',
        paragraphs: [
          '노트북 절전이나 탭 자동 일시중지는 장시간 전송에 영향을 줍니다.',
          '중요 전송 중에는 탭을 포그라운드에 유지하고 전원 연결 상태를 권장합니다.'
        ]
      }
    ]
  },
  {
    slug: 'mobile-file-sharing-checklist',
    title: '모바일 파일 공유 체크리스트',
    description: '모바일 환경에서 전송 실패를 줄이기 위한 핵심 점검 항목입니다.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '네트워크 상태',
        paragraphs: [
          '모바일은 와이파이와 LTE/5G 사이 전환이 잦아 연결이 끊길 수 있습니다.',
          '가능하면 전송 중 네트워크 전환을 피하고 신호가 안정적인 장소에서 진행하세요.'
        ]
      },
      {
        heading: '배터리 최적화 예외',
        paragraphs: [
          '배터리 최적화 정책이 브라우저 네트워크 작업을 제한하면 전송 속도가 급감합니다.',
          '브라우저를 배터리 최적화 예외로 설정하면 장시간 전송에서 안정성이 좋아질 수 있습니다.'
        ]
      }
    ]
  },
  {
    slug: 'file-naming-and-versioning',
    title: '파일명 규칙과 버전 관리 실무',
    description: '협업 파일 공유에서 혼선을 줄이는 파일명/버전 규칙 예시를 제공합니다.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '파일명 규칙',
        paragraphs: [
          '날짜, 프로젝트 코드, 버전 정보를 포함한 파일명 규칙을 통일하면 검색과 회수가 쉬워집니다.',
          '공백과 특수문자를 줄이고 영문/숫자/하이픈 중심으로 구성하면 호환성 문제가 줄어듭니다.'
        ]
      },
      {
        heading: '버전 충돌 방지',
        paragraphs: [
          '최종본 표시를 남발하기보다 v1, v2처럼 순번 기반 버전 전략을 권장합니다.',
          '배포용 파일은 별도 폴더 또는 접두어로 구분해 실수 업로드를 예방하세요.'
        ]
      }
    ]
  },
  {
    slug: 'copyright-safe-sharing',
    title: '저작권 이슈 없이 공유하는 방법',
    description: '저작권 분쟁을 줄이기 위한 기본 원칙과 팀 운영 기준을 정리합니다.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '권리 확인 절차',
        paragraphs: [
          '공유 전 파일의 라이선스와 사용 범위를 확인하고, 출처와 허용 조건을 기록하세요.',
          '외부 자료는 팀 내 검수 후 공유하고, 권한이 불명확한 파일은 전달을 보류해야 합니다.'
        ]
      },
      {
        heading: '위반 대응',
        paragraphs: [
          '권리자의 삭제 요청이 접수되면 즉시 공유 중단과 관련 링크 폐기가 필요합니다.',
          '반복 위반을 막기 위해 팀 정책 문서에 금지 사례와 승인 절차를 명시하세요.'
        ]
      }
    ]
  }
]

const enPosts: LocalizedGuidePost[] = [
  {
    slug: 'best-large-file-transfer-2026',
    title: 'Best Large File Transfer Methods in 2026',
    description: 'How to choose between cloud upload and direct P2P transfer by use case.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: 'Pick the right method',
        paragraphs: [
          'Before transfer, check whether the receiver is online now, whether long-term storage is needed, and how stable both networks are.',
          'For real-time delivery, P2P is often faster and cheaper. For long-term retention and repeat downloads, storage-based transfer is better.'
        ]
      },
      {
        heading: 'Checklist to reduce failures',
        paragraphs: [
          'Normalize file names and avoid problematic characters to reduce compatibility issues on the receiving side.',
          'In home router environments, avoid sleep mode, background throttling, and network switching during transfer.'
        ]
      }
    ]
  },
  {
    slug: 'p2p-vs-cloud-transfer',
    title: 'P2P Transfer vs Cloud Transfer',
    description: 'A practical comparison across speed, retention, and operating cost.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: 'Speed and latency',
        paragraphs: [
          'P2P can feel faster because it avoids an extra upload-to-storage step before download.',
          'Cloud transfer may take longer initially, but can be convenient when many people download repeatedly.'
        ]
      },
      {
        heading: 'Operational perspective',
        paragraphs: [
          'P2P can reduce storage cost but requires stronger connection reliability and fallback handling.',
          'Cloud transfer increases storage costs but makes access control and history management simpler.'
        ]
      }
    ]
  },
  {
    slug: 'secure-p2p-file-sharing',
    title: 'Safe P2P File Sharing Practices',
    description: 'Reduce risk with password protection, link discipline, and file verification.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: 'Link and password discipline',
        paragraphs: [
          'Do not post room links in public channels. Share only with intended recipients.',
          'For sensitive files, always set a room password and avoid reusing links after completion.'
        ]
      },
      {
        heading: 'File verification',
        paragraphs: [
          'After download, validate integrity with checksums and run malware scanning when needed.',
          'Do not open executables or unknown archives without verification.'
        ]
      }
    ]
  },
  {
    slug: 'improve-transfer-speed',
    title: 'Practical Tips to Improve Transfer Speed',
    description: 'Network, device, and browser adjustments that help increase throughput.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: 'Network optimization',
        paragraphs: [
          'Use 5GHz Wi-Fi or wired ethernet whenever possible and pause heavy streaming applications.',
          'Long distance from router can increase packet loss and sharply reduce transfer speed.'
        ]
      },
      {
        heading: 'Browser and device state',
        paragraphs: [
          'Too many open tabs or low memory can reduce transfer performance.',
          'Disable sleep mode during large transfers and keep the device active.'
        ]
      }
    ]
  },
  {
    slug: 'when-transfer-disconnects',
    title: 'What to Do When Transfer Disconnects',
    description: 'Common causes and a practical reconnection flow for unstable sessions.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: 'Diagnose likely causes',
        paragraphs: [
          'Frequent causes include browser background limits, mobile network switching, and power-saving mode.',
          'If disconnects repeat, reconnect on the same network and reopen the room link to start a fresh session.'
        ]
      },
      {
        heading: 'Retry strategy',
        paragraphs: [
          'For very large transfers, splitting files can reduce full-retry cost after failure.',
          'For critical files, verify checksum before and after transfer to detect corruption.'
        ]
      }
    ]
  },
  {
    slug: 'team-file-sharing-playbook',
    title: 'Team File Sharing Playbook',
    description: 'Operational rules for teams using P2P file sharing in real projects.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: 'Operating rules',
        paragraphs: [
          'Standardize file naming, version conventions, and completion checks to reduce rework.',
          'For sensitive files, define access scope and expiration policy explicitly.'
        ]
      },
      {
        heading: 'Role separation',
        paragraphs: [
          'Sender handles source accuracy and password setup, while receiver handles integrity checks and classification.',
          'Review error patterns regularly to improve both security and reliability.'
        ]
      }
    ]
  },
  {
    slug: 'browser-settings-for-stable-transfer',
    title: 'Browser Settings for Stable Transfers',
    description: 'How to reduce dropouts by tuning permissions and background behavior.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: 'Permission checks',
        paragraphs: [
          'If transfers fail repeatedly, review browser site permissions and popup restrictions first.',
          'Some privacy extensions can interfere with WebRTC; use safe exceptions when needed.'
        ]
      },
      {
        heading: 'Background behavior',
        paragraphs: [
          'Laptop sleep and tab suspension can break long transfers.',
          'Keep the transfer tab active and the device plugged in for critical sessions.'
        ]
      }
    ]
  },
  {
    slug: 'mobile-file-sharing-checklist',
    title: 'Mobile File Sharing Checklist',
    description: 'Key checks that improve reliability for mobile transfer sessions.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: 'Network stability',
        paragraphs: [
          'Mobile devices frequently switch between Wi-Fi and cellular networks, which can interrupt sessions.',
          'Avoid network switching during active transfers and use a stable signal environment.'
        ]
      },
      {
        heading: 'Battery optimization',
        paragraphs: [
          'Aggressive battery optimization can throttle browser networking tasks.',
          'Set browser app exceptions for long transfers when possible.'
        ]
      }
    ]
  },
  {
    slug: 'file-naming-and-versioning',
    title: 'File Naming and Versioning in Practice',
    description: 'Simple naming and version rules that reduce confusion in collaboration.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: 'Naming rules',
        paragraphs: [
          'Include date, project code, and version in file names for quick retrieval and traceability.',
          'Prefer alphanumeric and hyphen-based naming to reduce cross-platform issues.'
        ]
      },
      {
        heading: 'Prevent version conflicts',
        paragraphs: [
          'Use explicit version numbers like v1, v2 instead of many “final” labels.',
          'Separate release files from working drafts by folder or prefix.'
        ]
      }
    ]
  },
  {
    slug: 'copyright-safe-sharing',
    title: 'Sharing Without Copyright Risk',
    description: 'Basic principles to reduce copyright disputes in file transfer workflows.',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: 'Rights confirmation',
        paragraphs: [
          'Before sharing, verify license scope and allowed usage conditions for each file.',
          'When rights are unclear, hold delivery until review is complete.'
        ]
      },
      {
        heading: 'Violation response',
        paragraphs: [
          'If a takedown request is received, stop sharing immediately and invalidate related links.',
          'Document prohibited cases and approval flow to prevent repeat violations.'
        ]
      }
    ]
  }
]

type GuidePostText = { title: string; description: string }
type GuideSectionSummary = { heading: string; paragraph: string; note: string }

const localizedGuidePostText: Record<Exclude<LocaleKey, 'ko' | 'en'>, Record<string, GuidePostText>> = {
  ja: {
    'best-large-file-transfer-2026': {
      title: '2026年版 大容量ファイル転送の選び方',
      description: 'クラウド方式とP2P方式を用途別に比較します。'
    },
    'p2p-vs-cloud-transfer': {
      title: 'P2P転送とクラウド転送の違い',
      description: '速度・保管性・運用コストの観点で整理します。'
    },
    'secure-p2p-file-sharing': {
      title: '安全なP2Pファイル共有の実践',
      description: 'パスワード、リンク管理、検証手順をまとめます。'
    },
    'improve-transfer-speed': {
      title: '転送速度を上げる実践テクニック',
      description: 'ネットワークと端末設定で体感速度を改善する方法です。'
    },
    'when-transfer-disconnects': {
      title: '転送が切れたときの対処法',
      description: '原因の切り分けと再接続手順を段階的に説明します。'
    },
    'team-file-sharing-playbook': {
      title: 'チーム向けファイル共有運用ガイド',
      description: '実務チームで使える運用ルールを提案します。'
    },
    'browser-settings-for-stable-transfer': {
      title: 'ブラウザ設定で転送を安定化する',
      description: '権限とバックグラウンド挙動の見直しポイントです。'
    },
    'mobile-file-sharing-checklist': {
      title: 'モバイル転送チェックリスト',
      description: 'モバイル環境で失敗を減らす確認項目です。'
    },
    'file-naming-and-versioning': {
      title: 'ファイル命名と版管理の実務',
      description: '共有時の混乱を減らす命名・版管理ルールです。'
    },
    'copyright-safe-sharing': {
      title: '著作権リスクを避ける共有方法',
      description: '権利トラブルを減らす基本原則を整理します。'
    }
  },
  'zh-TW': {
    'best-large-file-transfer-2026': {
      title: '2026 大型檔案傳輸方式整理',
      description: '依情境比較雲端上傳與 P2P 傳輸。'
    },
    'p2p-vs-cloud-transfer': {
      title: 'P2P 與雲端傳輸差異',
      description: '從速度、保存與成本角度進行比較。'
    },
    'secure-p2p-file-sharing': {
      title: '安全的 P2P 檔案分享守則',
      description: '整理密碼、連結管理與檔案驗證做法。'
    },
    'improve-transfer-speed': {
      title: '提升傳輸速度的實用技巧',
      description: '透過網路與裝置設定提升傳輸效率。'
    },
    'when-transfer-disconnects': {
      title: '傳輸中斷時的處理方式',
      description: '說明常見原因與重新連線流程。'
    },
    'team-file-sharing-playbook': {
      title: '團隊檔案分享作業指南',
      description: '提供團隊情境可落地的操作規範。'
    },
    'browser-settings-for-stable-transfer': {
      title: '用瀏覽器設定提升穩定性',
      description: '檢查權限與背景限制以降低中斷。'
    },
    'mobile-file-sharing-checklist': {
      title: '行動裝置分享檢查清單',
      description: '行動端傳輸前後的關鍵確認項目。'
    },
    'file-naming-and-versioning': {
      title: '檔名規則與版本管理實務',
      description: '降低協作混亂的命名與版控原則。'
    },
    'copyright-safe-sharing': {
      title: '降低著作權風險的分享方法',
      description: '整理權利確認與應對流程。'
    }
  },
  'zh-CN': {
    'best-large-file-transfer-2026': {
      title: '2026 大文件传输方式整理',
      description: '按场景对比云端上传与 P2P 传输。'
    },
    'p2p-vs-cloud-transfer': {
      title: 'P2P 与云端传输的差异',
      description: '从速度、留存和成本维度进行比较。'
    },
    'secure-p2p-file-sharing': {
      title: '安全的 P2P 文件分享实践',
      description: '总结密码、链接管理与文件校验方法。'
    },
    'improve-transfer-speed': {
      title: '提升传输速度的实用技巧',
      description: '通过网络和设备设置提升传输体验。'
    },
    'when-transfer-disconnects': {
      title: '传输中断时如何处理',
      description: '说明常见原因与重连流程。'
    },
    'team-file-sharing-playbook': {
      title: '团队文件分享操作手册',
      description: '提供团队场景可执行的规则建议。'
    },
    'browser-settings-for-stable-transfer': {
      title: '用浏览器设置提升稳定性',
      description: '检查权限和后台限制，降低掉线概率。'
    },
    'mobile-file-sharing-checklist': {
      title: '移动端分享检查清单',
      description: '移动环境下减少失败的关键检查项。'
    },
    'file-naming-and-versioning': {
      title: '文件命名与版本管理实践',
      description: '减少协作混乱的命名与版本规范。'
    },
    'copyright-safe-sharing': {
      title: '避免版权风险的分享方式',
      description: '梳理权利确认与违规应对流程。'
    }
  },
  es: {
    'best-large-file-transfer-2026': {
      title: 'Mejores métodos para archivos grandes en 2026',
      description: 'Cómo elegir entre nube y P2P según el caso de uso.'
    },
    'p2p-vs-cloud-transfer': {
      title: 'Diferencias entre transferencia P2P y nube',
      description: 'Comparativa práctica en velocidad, retención y coste.'
    },
    'secure-p2p-file-sharing': {
      title: 'Buenas prácticas para compartir por P2P',
      description: 'Contraseña, control de enlaces y verificación de archivos.'
    },
    'improve-transfer-speed': {
      title: 'Consejos para mejorar la velocidad de transferencia',
      description: 'Ajustes de red y dispositivo para mayor rendimiento.'
    },
    'when-transfer-disconnects': {
      title: 'Qué hacer cuando la transferencia se corta',
      description: 'Causas comunes y flujo de reconexión paso a paso.'
    },
    'team-file-sharing-playbook': {
      title: 'Guía operativa para equipos',
      description: 'Reglas prácticas para compartir archivos en equipo.'
    },
    'browser-settings-for-stable-transfer': {
      title: 'Ajustes del navegador para transferencias estables',
      description: 'Permisos y comportamiento en segundo plano.'
    },
    'mobile-file-sharing-checklist': {
      title: 'Checklist de compartición móvil',
      description: 'Comprobaciones clave para sesiones en móviles.'
    },
    'file-naming-and-versioning': {
      title: 'Nombres de archivo y versionado en la práctica',
      description: 'Reglas simples para reducir confusión en colaboración.'
    },
    'copyright-safe-sharing': {
      title: 'Cómo compartir sin riesgo de copyright',
      description: 'Principios para reducir disputas de derechos.'
    }
  },
  fr: {
    'best-large-file-transfer-2026': {
      title: 'Transfert de gros fichiers en 2026',
      description: 'Choisir entre cloud et P2P selon le besoin.'
    },
    'p2p-vs-cloud-transfer': {
      title: 'P2P vs Cloud : quelles différences ?',
      description: 'Comparaison pratique sur la vitesse, la rétention et le coût.'
    },
    'secure-p2p-file-sharing': {
      title: 'Partage P2P sécurisé : bonnes pratiques',
      description: 'Mot de passe, gestion des liens et vérification.'
    },
    'improve-transfer-speed': {
      title: 'Améliorer la vitesse de transfert',
      description: 'Ajustements réseau et appareil pour de meilleures performances.'
    },
    'when-transfer-disconnects': {
      title: 'Que faire en cas de coupure ?',
      description: 'Causes fréquentes et procédure de reconnexion.'
    },
    'team-file-sharing-playbook': {
      title: 'Guide opérationnel pour les équipes',
      description: 'Règles concrètes pour le partage de fichiers en équipe.'
    },
    'browser-settings-for-stable-transfer': {
      title: 'Réglages navigateur pour plus de stabilité',
      description: 'Permissions et gestion de l’arrière-plan.'
    },
    'mobile-file-sharing-checklist': {
      title: 'Checklist de partage mobile',
      description: 'Points essentiels pour fiabiliser les sessions mobiles.'
    },
    'file-naming-and-versioning': {
      title: 'Nommage des fichiers et gestion des versions',
      description: 'Réduire les erreurs de collaboration avec des règles simples.'
    },
    'copyright-safe-sharing': {
      title: 'Partager sans risque de copyright',
      description: 'Principes de base pour limiter les litiges.'
    }
  },
  de: {
    'best-large-file-transfer-2026': {
      title: 'Große Dateien übertragen: Leitfaden 2026',
      description: 'Wann Cloud und wann P2P sinnvoll ist.'
    },
    'p2p-vs-cloud-transfer': {
      title: 'P2P-Transfer vs. Cloud-Transfer',
      description: 'Praxisvergleich zu Geschwindigkeit, Aufbewahrung und Kosten.'
    },
    'secure-p2p-file-sharing': {
      title: 'Sicheres Teilen per P2P',
      description: 'Passwort, Link-Disziplin und Dateiprüfung im Überblick.'
    },
    'improve-transfer-speed': {
      title: 'Übertragungsgeschwindigkeit verbessern',
      description: 'Netzwerk- und Geräte-Tipps für mehr Durchsatz.'
    },
    'when-transfer-disconnects': {
      title: 'Was tun bei Verbindungsabbruch?',
      description: 'Häufige Ursachen und strukturierter Reconnect-Ablauf.'
    },
    'team-file-sharing-playbook': {
      title: 'Team-Playbook für Dateifreigabe',
      description: 'Umsetzbare Regeln für Teams im Alltag.'
    },
    'browser-settings-for-stable-transfer': {
      title: 'Browser-Einstellungen für stabile Transfers',
      description: 'Berechtigungen und Hintergrundverhalten richtig setzen.'
    },
    'mobile-file-sharing-checklist': {
      title: 'Mobile Dateifreigabe-Checkliste',
      description: 'Wichtige Checks für stabile mobile Übertragungen.'
    },
    'file-naming-and-versioning': {
      title: 'Dateibenennung und Versionierung in der Praxis',
      description: 'Einfache Regeln gegen Versionschaos im Team.'
    },
    'copyright-safe-sharing': {
      title: 'Teilen ohne Urheberrechtsrisiko',
      description: 'Grundprinzipien zur Vermeidung von Streitfällen.'
    }
  },
  'pt-BR': {
    'best-large-file-transfer-2026': {
      title: 'Melhores formas de transferir arquivos grandes em 2026',
      description: 'Quando usar nuvem e quando usar P2P.'
    },
    'p2p-vs-cloud-transfer': {
      title: 'Diferenças entre transferência P2P e nuvem',
      description: 'Comparação prática de velocidade, retenção e custo.'
    },
    'secure-p2p-file-sharing': {
      title: 'Boas práticas para compartilhamento P2P seguro',
      description: 'Senha, gestão de links e verificação de arquivos.'
    },
    'improve-transfer-speed': {
      title: 'Como aumentar a velocidade de transferência',
      description: 'Ajustes de rede e dispositivo para melhor desempenho.'
    },
    'when-transfer-disconnects': {
      title: 'O que fazer quando a transferência cai',
      description: 'Causas comuns e fluxo de reconexão.'
    },
    'team-file-sharing-playbook': {
      title: 'Guia operacional para equipes',
      description: 'Regras práticas para compartilhar arquivos em times.'
    },
    'browser-settings-for-stable-transfer': {
      title: 'Configurações do navegador para mais estabilidade',
      description: 'Permissões e comportamento em segundo plano.'
    },
    'mobile-file-sharing-checklist': {
      title: 'Checklist de compartilhamento no celular',
      description: 'Pontos essenciais para sessões móveis confiáveis.'
    },
    'file-naming-and-versioning': {
      title: 'Nomenclatura de arquivos e versionamento na prática',
      description: 'Regras simples para reduzir confusão em colaboração.'
    },
    'copyright-safe-sharing': {
      title: 'Como compartilhar sem risco de copyright',
      description: 'Princípios para reduzir disputas de direitos.'
    }
  }
}

const localizedGuideSectionSummary: Record<Exclude<LocaleKey, 'ko' | 'en'>, GuideSectionSummary> = {
  ja: {
    heading: '要点',
    paragraph: 'この記事では、実務でそのまま使える共有手順を短く整理しています。',
    note: '詳細な社内ルールと接続環境を確認しながら適用してください。'
  },
  'zh-TW': {
    heading: '重點摘要',
    paragraph: '本文整理可直接套用於實務的檔案分享流程與注意事項。',
    note: '請依團隊規範與網路環境調整實際操作細節。'
  },
  'zh-CN': {
    heading: '重点摘要',
    paragraph: '本文整理了可直接落地的文件分享流程与关键注意事项。',
    note: '请结合团队规范与网络环境调整具体执行方式。'
  },
  es: {
    heading: 'Puntos clave',
    paragraph: 'Este artículo resume un flujo práctico para compartir archivos de forma estable.',
    note: 'Aplícalo según las normas de tu equipo y el entorno de red disponible.'
  },
  fr: {
    heading: 'Points clés',
    paragraph: 'Cet article présente un flux concret pour partager des fichiers de façon fiable.',
    note: 'Adaptez la mise en pratique aux règles de votre équipe et à votre réseau.'
  },
  de: {
    heading: 'Kernaussagen',
    paragraph: 'Dieser Artikel fasst einen praxistauglichen Ablauf für stabile Dateifreigaben zusammen.',
    note: 'Passen Sie die Umsetzung an Teamregeln und Netzwerkumgebung an.'
  },
  'pt-BR': {
    heading: 'Pontos principais',
    paragraph: 'Este artigo resume um fluxo prático para compartilhar arquivos com estabilidade.',
    note: 'Ajuste a execução conforme as regras do time e o ambiente de rede.'
  }
}

function getLocalizedGuidePosts(locale: LocaleKey): LocalizedGuidePost[] {
  if (locale === 'ko') return koPosts
  if (locale === 'en') return enPosts

  const textMap = localizedGuidePostText[locale]
  const summary = localizedGuideSectionSummary[locale]
  return enPosts.map((post) => {
    const override = textMap[post.slug]
    return {
      ...post,
      title: override?.title ?? post.title,
      description: override?.description ?? post.description,
      sections: [
        {
          heading: summary.heading,
          paragraphs: [override?.description ?? post.description, summary.paragraph, summary.note]
        }
      ]
    }
  })
}

export function getGuidePosts(locale: string): LocalizedGuidePost[] {
  return getLocalizedGuidePosts(localeKey(locale))
}

export function getGuidePost(slug: string, locale: string): LocalizedGuidePost | undefined {
  return getGuidePosts(locale).find((post) => post.slug === slug)
}

export function getGuideSlugs(): Array<{ slug: string }> {
  return enPosts.map((post) => ({ slug: post.slug }))
}
