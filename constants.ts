
import { ExampleSpecies } from './types';

export const UI_TEXT = {
  APP_TITLE: "해미 생태계 교란종 신고센터",
  NAV_REPORT: "신고하기",
  NAV_LEARN: "Gemini에게 물어보기", // Changed from "정보 학습"
  NAV_EXAMPLES: "교란종 도감", 
  REPORT_FORM_TITLE: "생태계 교란종 신고",
  SPECIES_NAME_LABEL: "교란종 이름",
  SPECIES_NAME_PLACEHOLDER: "예: 가시박, 뉴트리아",
  SIGHTING_DATE_LABEL: "발견 날짜 및 시간",
  LOCATION_LABEL: "발견 위치",
  LOCATION_PLACEHOLDER: "예: 해미읍성 동문 근처 또는 위도, 경도",
  GET_CURRENT_LOCATION_BUTTON: "현재 위치 가져오기",
  LOCATION_FETCHING: "위치 정보 가져오는 중...",
  LOCATION_FETCH_ERROR: "위치를 가져올 수 없습니다. 직접 입력하거나 권한을 확인해주세요.",
  LOCATION_FETCH_SUCCESS: "현재 위치를 가져왔습니다.",
  PHOTO_LABEL: "사진 첨부",
  PHOTO_HELPER: "교란종을 식별할 수 있는 사진을 첨부해주세요.",
  PHOTO_CHANGE: "사진 변경",
  REPORTER_NAME_LABEL: "신고자 이름 (선택)",
  REPORTER_NAME_PLACEHOLDER: "홍길동",
  REPORTER_CONTACT_LABEL: "연락처 (선택)",
  REPORTER_CONTACT_PLACEHOLDER: "010-1234-5678",
  NOTES_LABEL: "추가 설명 (선택)",
  NOTES_PLACEHOLDER: "발견 당시 상황, 개체 수 등",
  SUBMIT_REPORT_BUTTON: "신고 제출",
  RECENT_REPORTS_TITLE: "최근 신고 목록",
  NO_REPORTS: "아직 등록된 신고가 없습니다.",
  REPORT_ITEM_SPECIES: "종명:",
  REPORT_ITEM_DATE: "발견일:",
  REPORT_ITEM_LOCATION: "위치:",
  REPORT_ITEM_REPORTER: "신고자:",
  REPORT_ITEM_CONTACT: "연락처:",
  REPORT_ITEM_NOTES: "메모:",
  LEARN_SECTION_TITLE: "Gemini에게 교란종 정보 물어보기", // Changed
  LEARN_SPECIES_INPUT_LABEL: "정보를 알고 싶은 교란종 이름 입력",
  LEARN_SPECIES_INPUT_PLACEHOLDER: "예: 황소개구리",
  LEARN_SEARCH_BUTTON: "Gemini에게 물어보기", // Changed
  LEARN_LOADING: "Gemini가 답변을 준비 중입니다...", // Changed
  LEARN_ERROR_PREFIX: "오류 발생:",
  LEARN_NO_RESULT: "검색 결과가 없습니다.",
  IMAGE_ICON_ALT: "이미지 아이콘",
  UPLOAD_ICON_ALT: "업로드 아이콘",
  SEARCH_ICON_ALT: "검색 아이콘",
  API_KEY_ERROR: "Gemini API 키가 설정되지 않았습니다. 환경 변수 API_KEY를 설정해주세요.",
  GEMINI_GENERAL_ERROR: "정보를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  REQUIRED_FIELDS_ERROR: "교란종 이름, 발견 날짜/시간, 발견 위치는 필수 항목입니다.",
  REPORT_SUBMISSION_EMAIL_ADDRESS: "asdjj1@naver.com", 
  SUBMIT_REPORT_VIA_EMAIL_BUTTON: "신고 내용 이메일로 보내기",
  EMAIL_SUBMISSION_INSTRUCTION_TITLE: "이메일로 신고 완료하기",
  EMAIL_SUBMISSION_INSTRUCTION_BODY: "신고 내용이 준비되었습니다. 잠시 후 이메일 프로그램이 열리면 내용을 확인하고 '보내기'를 눌러주세요. 사진을 첨부하셨다면, 열린 이메일에 해당 사진 파일을 직접 첨부해주셔야 합니다.",
  EMAIL_SUBMISSION_MANUAL_INSTRUCTION: "만약 이메일 프로그램이 자동으로 열리지 않으면, 다음 정보를 복사하여 이메일을 작성해주세요:",
  EMAIL_SUBJECT_PREFIX: "생태계 교란종 신고:",
  LEARN_IMAGE_LOADING: "Gemini가 이미지를 생성 중입니다...", // Changed
  LEARN_IMAGE_ERROR: "이미지를 생성하는 중 오류가 발생했습니다. 다른 종으로 시도해보세요.",
  LEARN_SPECIES_IMAGE_ALT: "{speciesName} 이미지 (Gemini 생성)", // Changed
  EXAMPLES_SECTION_TITLE: "주요 생태계 교란종 예시", 
  EXAMPLE_SPECIES_CARD_ALT: "{speciesName} 사진 예시",
  LOCATION_ICON_ALT: "위치 아이콘",
};

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_MODEL_IMAGE = 'imagen-3.0-generate-002';

export const EXAMPLE_SPECIES_LIST: ExampleSpecies[] = [
  { name: "가시박", imageUrl: "https://i.imgur.com/bIhY2BY.png", scientificName: "Sicyos angulatus" }, 
  { name: "가시상추", imageUrl: "https://i.imgur.com/HvItw3Z.jpeg", scientificName: "Lactuca scariola" },
  { name: "황소개구리", imageUrl: "https://i.imgur.com/wslcijl.jpeg", scientificName: "Lithobates catesbeianus" },
  { name: "배스", imageUrl: "https://i.imgur.com/GkDzK9D.png", scientificName: "Micropterus salmoides" },
  { name: "미국가재", imageUrl: "https://i.imgur.com/QMi07G4.png", scientificName: "Procambarus clarkii" },
  { name: "환삼덩굴", imageUrl: "https://i.imgur.com/7rUfXtj.png", scientificName: "Humulus japonicus" }, 
  { name: "서양금혼초", imageUrl: "https://i.imgur.com/j5GAGtV.png", scientificName: "Hypochaeris radicata" },
  { name: "돼지풀", imageUrl: "https://i.imgur.com/ymMowpX.png", scientificName: "Ambrosia artemisiifolia" },
  { name: "미국쑥부쟁이", imageUrl: "https://i.imgur.com/TNUlkRb.png", scientificName: "Symphyotrichum pilosum" },
  { name: "블루길", imageUrl: "https://i.imgur.com/mK5Ayhw.png", scientificName: "Lepomis macrochirus" },
  { name: "단풍잎돼지풀", imageUrl: "https://i.imgur.com/HevrAnT.png", scientificName: "Ambrosia trifida" },
  { name: "도깨비가지", imageUrl: "https://i.imgur.com/ywsGpIn.png", scientificName: "Solanum carolinense" },
];
