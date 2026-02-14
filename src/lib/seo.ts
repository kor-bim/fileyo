import type { Locale } from '@/lib/locales'

export const localeSeo: Record<
  Locale,
  {
    title: string
    description: string
    keywords: string[]
    ogLocale: string
  }
> = {
  ko: {
    title: '회원가입 없이 파일 공유 | Fileyo',
    description: '설치 없이 링크나 QR로 파일을 바로 공유하세요. 대용량 파일, 비밀번호 공유, 다중 파일 전송 지원.',
    keywords: [
      '파일 공유',
      '파일 전송',
      '대용량 파일 공유',
      '회원가입 없이 파일 공유',
      '링크 파일 공유',
      'QR 파일 공유',
      '비밀번호 파일 공유',
      'P2P 파일 공유',
      'WebRTC 파일 전송',
      '브라우저 파일 전송',
      '서버 없이 파일 공유',
      '무료 파일 공유'
    ],
    ogLocale: 'ko_KR'
  },
  en: {
    title: 'Share Files Without Sign-up | Fileyo',
    description:
      'Share files instantly with a link or QR. No signup, password protection, and fast browser-to-browser transfer.',
    keywords: [
      'file sharing',
      'large file transfer',
      'no signup file sharing',
      'link file sharing',
      'QR file sharing',
      'password protected file sharing',
      'P2P file transfer',
      'WebRTC file transfer',
      'browser file transfer',
      'peer to peer file sharing',
      'send large files online',
      'free file transfer'
    ],
    ogLocale: 'en_US'
  },
  ja: {
    title: '会員登録なしでファイル共有 | Fileyo',
    description: 'リンクやQRですぐ共有。会員登録不要、パスワード保護対応、ブラウザ間で高速転送。',
    keywords: [
      'ファイル共有',
      '大容量ファイル転送',
      '会員登録不要 ファイル共有',
      'リンク共有',
      'QR ファイル共有',
      'パスワード付き ファイル共有',
      'P2P ファイル転送',
      'WebRTC ファイル転送',
      'ブラウザ ファイル転送'
    ],
    ogLocale: 'ja_JP'
  },
  'zh-TW': {
    title: '免註冊檔案分享 | Fileyo',
    description: '用連結或 QR 立即分享檔案。免註冊、可設密碼、支援多檔與大檔傳輸。',
    keywords: [
      '檔案分享',
      '大檔案傳輸',
      '免註冊 檔案分享',
      '連結 檔案分享',
      'QR 檔案分享',
      '密碼保護 檔案分享',
      'P2P 檔案傳輸',
      'WebRTC 檔案傳輸',
      '瀏覽器 檔案傳輸'
    ],
    ogLocale: 'zh_TW'
  },
  'zh-CN': {
    title: '免注册文件分享 | Fileyo',
    description: '用链接或二维码立即分享文件。免注册、可设密码、支持多文件与大文件传输。',
    keywords: [
      '文件分享',
      '大文件传输',
      '免注册 文件分享',
      '链接 分享文件',
      '二维码 文件分享',
      '密码保护 文件分享',
      'P2P 文件传输',
      'WebRTC 文件传输',
      '浏览器 文件传输'
    ],
    ogLocale: 'zh_CN'
  },
  es: {
    title: 'Comparte Archivos Sin Registro | Fileyo',
    description:
      'Comparte archivos al instante con enlace o QR. Sin registro, con contraseña y transferencia rápida entre navegadores.',
    keywords: [
      'compartir archivos',
      'transferir archivos grandes',
      'compartir archivos sin registro',
      'compartir archivos por enlace',
      'compartir archivos con QR',
      'compartir archivos con contraseña',
      'transferencia P2P',
      'transferencia WebRTC',
      'transferencia entre navegadores',
      'enviar archivos gratis'
    ],
    ogLocale: 'es_ES'
  },
  fr: {
    title: 'Partage de Fichiers Sans Inscription | Fileyo',
    description:
      'Partagez vos fichiers instantanément via lien ou QR. Sans inscription, avec mot de passe et transfert rapide entre navigateurs.',
    keywords: [
      'partage de fichiers',
      'transfert de gros fichiers',
      'partage sans inscription',
      'partage par lien',
      'partage avec QR',
      'partage avec mot de passe',
      'transfert P2P',
      'transfert WebRTC',
      'transfert entre navigateurs'
    ],
    ogLocale: 'fr_FR'
  },
  de: {
    title: 'Dateien Teilen Ohne Registrierung | Fileyo',
    description:
      'Dateien sofort per Link oder QR teilen. Ohne Registrierung, mit Passwortschutz und schnellem Browser-zu-Browser-Transfer.',
    keywords: [
      'dateien teilen',
      'große dateien senden',
      'ohne registrierung dateien teilen',
      'datei teilen per link',
      'datei teilen mit QR',
      'passwortgeschützter datei transfer',
      'P2P dateiübertragung',
      'WebRTC dateiübertragung',
      'browser zu browser transfer'
    ],
    ogLocale: 'de_DE'
  },
  'pt-BR': {
    title: 'Compartilhe Arquivos Sem Cadastro | Fileyo',
    description:
      'Compartilhe arquivos instantaneamente por link ou QR. Sem cadastro, com senha e transferência rápida entre navegadores.',
    keywords: [
      'compartilhar arquivos',
      'transferir arquivos grandes',
      'compartilhar arquivos sem cadastro',
      'compartilhar por link',
      'compartilhar por QR',
      'compartilhar com senha',
      'transferência P2P',
      'transferência WebRTC',
      'transferência entre navegadores',
      'enviar arquivos grátis'
    ],
    ogLocale: 'pt_BR'
  }
}
