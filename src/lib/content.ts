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
    title: '🚀 2026 대용량 파일 전송 방법 총정리! 아직도 이메일로 보내시나요? ㅎㅎ',
    description: '클라우드 vs P2P, 뭐가 진짜 빠르고 안전할까?',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '클라우드 vs P2P, 뭐가 진짜 빠르고 안전할까?',
        paragraphs: [
          '용량 5GB, 10GB… 요즘 영상 하나만 찍어도 파일이 어마어마하쥬?',
          '이메일로 보내려다 “첨부파일 용량 초과” 뜨면 진짜 허탈함ㅠㅠ',
          '그래서 오늘은 **2026년 기준 대용량 파일 전송 방법**을 싹 정리해보겠심다!',
          '클라우드 업로드 방식이랑 P2P 직접 전송 방식,',
          '이 둘의 차이를 기준으로 상황별로 딱! 정리해드리겠슴미다 😎'
        ]
      },
      {
        heading: '왜 전송 방식 선택이 중요한가',
        paragraphs: [
          '요즘은 재택근무, 프리랜서 작업, 영상 편집, 디자인 협업까지',
          '파일 주고받을 일이 진짜 많아졌습니다.',
          '저도 4K 영상 작업하다가',
          '원본 파일 30GB 넘게 나와서 멘붕 온 적 있었거든요 ㅋㅋ',
          '그때 깨달았죠.',
          '“아… 전송 방식 제대로 알아둬야겠다…”',
          '무조건 빠르다고 좋은 것도 아니고',
          '무조건 안전하다고 편한 것도 아니더라구요.',
          '오늘은 진짜 현실적인 기준으로 정리해보겠심다.',
          '괜히 복잡하게 말 안 하겠슴다. 딱 필요한 내용만!'
        ]
      },
      {
        heading: 'STEP 2. 클라우드 업로드 vs P2P 전송, 제대로 비교해봅시다',
        paragraphs: [
          '1️⃣ 클라우드 업로드 방식이란?',
          '클라우드는 말 그대로',
          '파일을 인터넷 서버에 올려두고',
          '상대방이 그걸 다운로드하는 구조입니다.',
          '대표적으로 이런 서비스들이 있쥬?',
          '- Google Drive',
          '- Dropbox',
          '- OneDrive',
          '- 네이버 MYBOX',
          '장점은 뭘까요?',
          '✔ 상대방이 오프라인이어도 전송 가능',
          '✔ 링크 하나로 여러 명에게 공유 가능',
          '✔ 파일 백업 효과까지 있음',
          '근데 단점도 있슴다.',
          '❌ 업로드 시간 오래 걸림',
          '❌ 용량 제한 있음 (무료는 특히 ㅠㅠ)',
          '❌ 서버 속도 영향 받음',
          '즉, **협업이나 장기 보관용으로 좋다**는 느낌이쥬.'
        ]
      },
      {
        heading: '2️⃣ P2P 전송 방식이란?',
        paragraphs: [
          'P2P는 서버를 거치지 않고',
          '내 컴퓨터 → 상대 컴퓨터로',
          '직접 전송하는 방식입니다.',
          '대표 예시로는',
          '- Send Anywhere (P2P 모드)',
          '- WeTransfer 실시간 모드',
          '- 로컬 네트워크 직접 전송',
          '장점은요?',
          '✔ 속도 빠름 (특히 같은 네트워크면 미쳤슴다 ㅋㅋ)',
          '✔ 서버 용량 제한 거의 없음',
          '✔ 대용량 파일에 강함',
          '하지만…',
          '❌ 상대방이 접속 중이어야 함',
          '❌ 연결 끊기면 전송 실패 가능',
          '❌ 백업은 따로 안 됨',
          '그래서 **급하게 바로 전달해야 할 때** 최고입니다.'
        ]
      },
      {
        heading: '3️⃣ 5GB 이하 파일 전송할 때',
        paragraphs: [
          '이 정도면 솔직히',
          '클라우드가 제일 편함다.',
          '링크 복붙해서 보내면 끝.',
          '상대방 시간 맞출 필요도 없고',
          '모바일에서도 다운로드 가능.',
          '업무 자료, PDF, 이미지 묶음 파일은',
          '클라우드가 스트레스 적음다 ㅎㅎ'
        ]
      },
      {
        heading: '4️⃣ 10GB~50GB 영상 파일일 때',
        paragraphs: [
          '이 구간부터 고민 시작임다 ㅋㅋ',
          '업로드만 1~2시간 걸릴 수 있음.',
          '이럴 땐 상황 봐야 합니다.',
          '✔ 상대가 바로 받을 수 있다 → **P2P 추천**',
          '✔ 여러 명에게 배포해야 한다 → **클라우드 추천**',
          '영상 작업자분들은',
          '둘 다 병행하는 경우 많더라구요.'
        ]
      },
      {
        heading: '5️⃣ 보안이 중요한 파일이라면?',
        paragraphs: [
          '기업 문서, 계약서, 내부 자료라면',
          '암호화 지원되는 클라우드 사용이 안전합니다.',
          '2단계 인증, 접근 권한 설정 이런 거 필수쥬.',
          'P2P도 암호화 지원하는 서비스가 있지만',
          '보통 기업은 클라우드 쪽을 더 선호합니다.'
        ]
      },
      {
        heading: '6️⃣ 인터넷 속도가 느릴 때는?',
        paragraphs: [
          '이건 좀 의외인데요.',
          '업로드 속도가 느리면',
          '클라우드는 지옥입니다 ㅠㅠ',
          '이럴 땐',
          '같은 공간에 있다면 외장 SSD가 답입니다 ㅋㅋ',
          '원격이라면',
          'P2P가 체감상 더 빠를 수 있음다.'
        ]
      },
      {
        heading: 'STEP 3. 많이들 헷갈려하는 부분 정리해봅니다',
        paragraphs: [
          '🔹 클라우드가 무조건 안전한가요?',
          '대형 서비스는 기본 보안이 잘 되어 있지만',
          '링크를 아무나 공유하면 위험할 수 있습니다.',
          '접근 권한 설정은 꼭 하셔야 합니다.',
          '🔹 P2P는 불법인가요?',
          '전혀 아닙니다.',
          '방식일 뿐이고,',
          '저작권 문제는 파일 내용에 따라 달라지는 겁니다.',
          '🔹 무료로 100GB 보내는 방법 있나요?',
          '무료는 대부분 용량 제한이 있습니다.',
          '대용량은 유료 플랜 쓰는 게 정신 건강에 좋습니다 ㅎㅎ'
        ]
      },
      {
        heading: '마무리',
        paragraphs: [
          '파일 전송은',
          '“뭐가 더 좋다”가 아니라',
          '“지금 상황에 뭐가 맞느냐”가 핵심이더라구요.',
          '급한가요? → P2P',
          '여러 명 공유인가요? → 클라우드',
          '백업 필요합니까? → 클라우드',
          '속도 최우선입니까? → P2P',
          '이 기준만 기억해도 절반은 성공입니다.',
          '요즘 데이터 용량 계속 커지고 있습니다.',
          '전송 방식 제대로 알아두면',
          '시간도 아끼고 스트레스도 줄어듭니다 ㅎㅎ',
          '여러분은 주로 어떤 방식 쓰고 계신가요?',
          '클라우드파인가요, P2P파인가요?',
          '은근히 취향 갈리더라구요 ㅋㅋ',
          '📌 관련 태그',
          '대용량 파일 전송, 클라우드 업로드, P2P 전송, 파일 공유 방법, 2026 IT 트렌드, 파일 전송 속도 비교'
        ]
      }
    ]
  },
  {
    slug: 'p2p-vs-cloud-transfer',
    title: '⚡ P2P 전송 vs 클라우드 전송, 뭐가 진짜 이득일까? 2026 현실 비교 들어갑니다',
    description: '속도? 보관성? 운영비? 결국 돈과 시간 싸움이더라구요 ㅎㅎ',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '속도? 보관성? 운영비? 결국 돈과 시간 싸움이더라구요 ㅎㅎ',
        paragraphs: [
          '파일 한 번 보내보셨쥬?',
          '10GB 영상 하나, 디자인 원본 PSD 하나…',
          '업로드 시작 눌러놓고',
          '커피 두 잔 마시고 와도 30% ㅋㅋ',
          '그래서 다들 고민합니다.',
          'P2P가 빠르다는데 그게 맞나?',
          '클라우드가 안전하다는데 무조건 좋은 건가?',
          '오늘은 감성 말고',
          '**속도, 보관성, 운영비** 딱 세 가지 기준으로',
          '진짜 현실적으로 비교해보겠심다.',
          '괜히 추상적으로 말 안 하겠슴다.',
          '실제 써본 입장에서 정리합니다 😎',
          '요즘 데이터는 기본이 수십 GB입니다.',
          '특히 영상 작업, 설계 파일, 게임 리소스…',
          '이쯤 되면 전송 방식이 곧 비용입니다.',
          '시간도 돈이고, 서버도 돈이고, 사람 시간도 돈이쥬 ㅠㅠ',
          '그럼 바로 들어가보겠슴미다.'
        ]
      },
      {
        heading: 'STEP 2. 속도 · 보관성 · 운영비 3대 관점 비교',
        paragraphs: [
          '1️⃣ 속도 비교 – 체감 속도는 누가 빠를까?',
          'P2P는 기본적으로',
          '내 장비 → 상대 장비로 직접 전송합니다.',
          '중간 서버 안 거치니까',
          '이론적으로 가장 빠름.',
          '특히',
          '✔ 같은 사무실',
          '✔ 같은 네트워크',
          '✔ 기가 인터넷 환경',
          '이 조건이면 체감 속도 미쳤습니다 ㅋㅋ',
          '외장 SSD 복사 느낌에 가까움.',
          '반면 클라우드는?',
          '내가 업로드 → 서버 저장 → 상대가 다운로드',
          '즉, 두 번 이동합니다.',
          '업로드 속도 느리면 바로 지옥행 ㅠㅠ',
          '그래서 **속도만 보면 P2P 승**입니다.',
          '단, 상대가 접속 중일 때만요.'
        ]
      },
      {
        heading: '2️⃣ 보관성 – 파일 남아있느냐가 핵심',
        paragraphs: [
          '이 부분은 클라우드가 압도적입니다.',
          '클라우드는 서버에 저장되기 때문에',
          '백업 기능이 기본입니다.',
          '링크 공유 후에도',
          '파일이 계속 남아있습니다.',
          '버전 관리도 가능.',
          'P2P는?',
          '전송 끝나면 끝입니다.',
          '따로 저장 안 하면 기록 없음.',
          '즉,',
          '✔ 장기 보관 필요',
          '✔ 여러 명과 반복 공유',
          '✔ 이력 관리 필요',
          '이 조건이면 무조건 클라우드입니다.',
          '보관성은 **클라우드 완승**.'
        ]
      },
      {
        heading: '3️⃣ 운영비 – 진짜 중요한 부분',
        paragraphs: [
          '이게 은근히 핵심입니다.',
          '🔹 P2P 비용 구조',
          '서버 비용 없음',
          '저장 공간 비용 없음',
          '대신',
          '✔ 인터넷 속도 중요',
          '✔ 전송 중 장비 점유',
          '✔ 인건비 시간 소모',
          '소규모 팀은 거의 공짜 느낌.',
          '🔹 클라우드 비용 구조',
          '무료 용량?',
          '거의 금방 차버립니다 ㅋㅋ',
          '대용량이면',
          '월 구독료 발생합니다.',
          '100GB, 1TB, 5TB…',
          '이게 쌓이면 운영비가 은근히 큽니다.',
          '대신',
          '✔ 서버 유지',
          '✔ 백업',
          '✔ 접근 관리',
          '이 모든 게 포함된 가격이긴 합니다.',
          '즉,',
          '단발성 전송 많다 → P2P 저렴',
          '장기 저장 필수 → 클라우드 비용 감수'
        ]
      },
      {
        heading: '4️⃣ 기업 환경에서는 뭐가 유리할까?',
        paragraphs: [
          '기업은 단순 속도보다',
          '관리와 통제가 중요합니다.',
          '접근 권한 설정',
          '로그 기록',
          '보안 암호화',
          '이런 기능은 클라우드가 강합니다.',
          '그래서 기업은 보통',
          '클라우드 + 내부 NAS + 일부 P2P 병행합니다.',
          '하나만 쓰는 경우는 드뭅니다.'
        ]
      },
      {
        heading: '5️⃣ 프리랜서나 1인 작업자는?',
        paragraphs: [
          '저는 개인적으로',
          'P2P 많이 씁니다 ㅎㅎ',
          '바로 전달하고',
          '서버 비용 안 내고',
          '깔끔하게 끝.',
          '근데 포트폴리오 파일이나',
          '클라이언트 공유 자료는',
          '클라우드에 백업해둡니다.',
          '결국 혼합 전략이 제일 현실적이더라구요.'
        ]
      },
      {
        heading: '6️⃣ 상황별 요약 정리',
        paragraphs: [
          '✔ 급하게 큰 파일 한 명에게 전달 → P2P',
          '✔ 여러 명에게 반복 공유 → 클라우드',
          '✔ 저장 + 관리 중요 → 클라우드',
          '✔ 비용 최소화 단기 전송 → P2P',
          '✔ 기업 협업 환경 → 클라우드 중심',
          '딱 이렇게 기억하면 됩니다.'
        ]
      },
      {
        heading: 'STEP 3. 사람들이 가장 헷갈려하는 부분',
        paragraphs: [
          '🔹 P2P가 항상 더 빠른가요?',
          '상대방 인터넷 속도가 느리면',
          '체감 속도 떨어집니다.',
          '둘 다 빠른 환경이어야 진짜 빠릅니다.',
          '🔹 클라우드는 무조건 비싼가요?',
          '개인 용도는 부담 적습니다.',
          '기업 대용량 운영이 비쌉니다.',
          '🔹 보안은 어디가 더 안전한가요?',
          '잘 관리된 클라우드가 안정적입니다.',
          'P2P는 설정에 따라 다릅니다.'
        ]
      },
      {
        heading: '마무리',
        paragraphs: [
          '파일 전송은 결국',
          '**시간 vs 보관 vs 비용** 싸움입니다.',
          '속도만 보면 P2P,',
          '관리와 기록은 클라우드.',
          '2026년 기준으로 보면',
          '둘 중 하나를 고르는 게 아니라',
          '상황별로 섞어 쓰는 게 정답 같더라구요.',
          '여러분은 어떤 쪽이 더 맞는 스타일이신가요?',
          '빠른 게 최고입니까,',
          '안전하고 남는 게 최고입니까? ㅎㅎ',
          '은근히 성향 갈립니다.',
          '📌 관련 태그',
          'P2P 전송, 클라우드 전송, 파일 전송 비교, 전송 속도 차이, 클라우드 운영비, 대용량 파일 관리'
        ]
      }
    ]
  },
  {
    slug: 'secure-p2p-file-sharing',
    title: '🔐 안전한 P2P 파일 공유 수칙, 이거 모르면 진짜 한 방에 갑니다 ㅠㅠ',
    description: '비밀번호 · 링크 관리 · 파일 검증… 기본만 지켜도 사고 확 줄어듭니다',
    publishedAt: '2026-02-15',
    sections: [
      {
        heading: '비밀번호 · 링크 관리 · 파일 검증… 기본만 지켜도 사고 확 줄어듭니다',
        paragraphs: [
          'P2P 전송 빠르다고',
          '그냥 코드 받아서 바로 보내고 끝…',
          '이렇게 쓰고 계신 건 아니시쥬? ㅎㅎ',
          '직접 연결이라 뭔가 더 안전해 보이는데요,',
          '사실은 반대입니다.',
          '클라우드는 서버가 관리라도 해주는데,',
          'P2P는 내가 설정 안 하면 그대로 뚫립니다 ㅠㅠ',
          '저도 예전에',
          '테스트 파일이라고 가볍게 보냈다가',
          '링크가 며칠 살아있던 걸 뒤늦게 발견했거든요…',
          '진짜 식은땀 났습니다.',
          '그래서 오늘은',
          '괜히 겁주는 글 아니고요,',
          '실제로 사고 줄이는 현실 수칙만',
          '조금 더 깊게, 구체적으로 정리해보겠심다.',
          '파일 유출은',
          '해커 영화처럼 거창하게 발생하지 않습니다.',
          '대부분',
          '✔ 비밀번호 없음',
          '✔ 링크 무기한 공개',
          '✔ 공용 와이파이 사용',
          '이 세 가지에서 터집니다.',
          '그럼 제대로 들어가보겠슴미다.'
        ]
      },
      {
        heading: 'STEP 2. 사고를 줄이는 실전 보안 수칙 8가지',
        paragraphs: [
          '1️⃣ 비밀번호는 기본값이 아니라 “강제값”입니다',
          'P2P 공유할 때',
          '비밀번호 설정 옵션이 있다면',
          '그건 선택이 아닙니다. 기본입니다.',
          '✔ 최소 8~12자리 이상',
          '✔ 영문 대소문자 혼합',
          '✔ 숫자 + 특수문자 포함',
          '✔ 파일명과 전혀 무관한 조합',
          '“12345678”',
          '“abcd1234”',
          '“project2026”',
          '이런 건 1초 컷입니다 ㅠㅠ',
          '그리고 중요한 포인트 하나.',
          '링크와 비밀번호를',
          '같은 메신저, 같은 메시지에 보내지 마십시오.',
          '링크는 카톡,',
          '비밀번호는 문자나 전화.',
          '분리만 해도 보안 레벨이 확 올라갑니다.'
        ]
      },
      {
        heading: '2️⃣ 링크는 반드시 유효기간을 설정하십시오',
        paragraphs: [
          '많은 분들이 이걸 안 합니다.',
          '“어차피 한 번 받으면 끝이겠지~”',
          '아닙니다.',
          '링크는 복사되어 돌아다닐 수 있습니다.',
          '✔ 1회 다운로드 제한',
          '✔ 24시간~48시간 만료',
          '✔ 다운로드 후 자동 삭제',
          '이 옵션은 거의 필수입니다.',
          '특히 계약서, 견적서, 개인 정보 파일은',
          '무기한 링크 절대 금물입니다.',
          '파일 공유는',
          '“전송 완료 = 링크 제거”',
          '이 공식이 기본입니다.'
        ]
      },
      {
        heading: '3️⃣ 파일 자체 암호화는 한 번 더 생각해볼 문제',
        paragraphs: [
          '민감한 자료라면',
          '압축 후 암호 설정까지 추천드립니다.',
          '예:',
          'ZIP 암호 설정',
          '7z 암호화',
          'PDF 자체 암호화',
          '이중 잠금 구조가 됩니다.',
          '혹시라도 링크가 노출되더라도',
          '파일은 한 번 더 보호됩니다.',
          '조금 번거롭지만',
          '중요 자료라면 이 정도는 해야 합니다.'
        ]
      },
      {
        heading: '4️⃣ 공용 와이파이 사용은 진짜 위험합니다',
        paragraphs: [
          '카페, 공항, 코워킹 스페이스.',
          '와이파이 비밀번호 걸려 있다고',
          '안전한 거 아닙니다.',
          '같은 네트워크에 누가 있는지 모릅니다.',
          '특히 회사 내부 문서라면',
          '외부 공용망에서 직접 P2P 전송은 피하시는 게 좋습니다.',
          '정 불가피하다면',
          'VPN이라도 사용하십시오.'
        ]
      },
      {
        heading: '5️⃣ 파일 검증 (해시값 확인) 습관 들이기',
        paragraphs: [
          '이건 조금 전문적인 영역인데',
          '사실 별거 아닙니다.',
          '파일 전송 후',
          'SHA-256 같은 해시값을 비교하면',
          '✔ 파일이 변조되었는지',
          '✔ 전송 중 손상되었는지',
          '확인할 수 있습니다.',
          '대용량 영상, 설계 도면, 프로그램 파일',
          '이런 건 꼭 해보시는 게 좋습니다.',
          '요즘은 자동으로 체크해주는 프로그램도 많습니다.'
        ]
      },
      {
        heading: '6️⃣ 파일명에 개인정보 절대 넣지 마십시오',
        paragraphs: [
          '은근히 많이 합니다.',
          '“김OO_계약서_주민번호.pdf”',
          '“홍길동_이력서_전화번호.hwp”',
          '파일명만 유출돼도 문제입니다.',
          '공유 전',
          '파일명 정리부터 하십시오.',
          '파일명은 중립적으로,',
          '내용은 파일 안에서 보호.',
          '이게 기본입니다.'
        ]
      },
      {
        heading: '7️⃣ 전송 로그와 기록 관리',
        paragraphs: [
          '보냈다고 끝이 아닙니다.',
          '✔ 상대 다운로드 완료 확인',
          '✔ 링크 삭제 확인',
          '✔ 공유 기록 점검',
          '기업이라면',
          '누가 언제 받았는지 로그 관리가 중요합니다.',
          'P2P는 기록이 남지 않는 경우도 있으니',
          '수동 관리라도 해두는 게 좋습니다.'
        ]
      },
      {
        heading: '8️⃣ “테스트 파일”도 방심하지 마십시오',
        paragraphs: [
          '많이들 이렇게 말합니다.',
          '“이건 테스트용이라 괜찮아요~”',
          '근데 그 안에',
          '회사 로고, 내부 데이터, 고객 정보 일부',
          '들어가 있는 경우 많습니다.',
          '보안 사고는',
          '대충 보낸 파일에서 시작합니다.',
          '작은 파일이라도',
          '기본 수칙은 동일하게 적용하십시오.'
        ]
      },
      {
        heading: 'STEP 3. 자주 헷갈리는 부분 조금 더 정리합니다',
        paragraphs: [
          '🔹 P2P는 원래 위험한 구조인가요?',
          '구조 자체가 위험한 건 아닙니다.',
          '설정에 책임이 사용자에게 있는 구조입니다.',
          '즉, 잘 쓰면 안전하고',
          '대충 쓰면 위험합니다.',
          '🔹 무료 P2P 써도 되나요?',
          '가능은 합니다.',
          '다만 확인해야 할 것:',
          '✔ 종단간 암호화(E2E) 지원 여부',
          '✔ 서버 중계 방식인지 직접 연결인지',
          '✔ 파일 자동 삭제 정책',
          '이 세 가지는 최소 체크입니다.',
          '🔹 파일이 유출되면 어떻게 되나요?',
          '계약 위반',
          '기업 신뢰도 하락',
          '법적 문제',
          '생각보다 후폭풍 큽니다.',
          '그래서 “조금 번거롭더라도 기본 수칙 지키기”가',
          '가장 싸게 먹히는 방법입니다.'
        ]
      },
      {
        heading: '마무리',
        paragraphs: [
          'P2P는 빠릅니다.',
          '편합니다.',
          '대용량에 강합니다.',
          '하지만 관리 책임도 사용자에게 있습니다.',
          '비밀번호 설정',
          '링크 만료',
          '파일 암호화',
          '해시 검증',
          '전송 후 삭제',
          '이 다섯 가지만 습관 들이면',
          '사고 확률 거의 바닥까지 떨어집니다.',
          '속도만 보지 마시고',
          '설정 한 번 더 확인하는 습관.',
          '그게 진짜 안전입니다.',
          '지금 사용 중인 P2P 프로그램,',
          '보안 옵션 한 번 열어보셔도 좋겠습니다.',
          '의외로 기본값 그대로 쓰는 분들',
          '진짜 많습니다 ㅎㅎ',
          '📌 관련 태그',
          'P2P 파일 공유, 파일 보안 수칙, 비밀번호 설정 방법, 링크 관리, 파일 무결성 검증, 안전한 파일 전송'
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
