-- ============================================
-- MOA OTT 구독 공유 서비스 샘플 데이터 배치
-- ============================================

-- --------------------------------------------
-- 0. 코드/기본 테이블 (COMMUNITY_CODE / PUSH_CODE / CATEGORY / PRODUCT)
-- --------------------------------------------

INSERT INTO COMMUNITY_CODE (COMMUNITY_CODE_ID, CATEGORY, CODE_NAME)
VALUES
(1, '공지', '공지사항'),
(2, 'FAQ', '자주 묻는 질문'),
(3, '문의', '1:1 문의')
ON DUPLICATE KEY UPDATE CODE_NAME = VALUES(CODE_NAME);

INSERT INTO PUSH_CODE (PUSH_CODE_ID, CODE_NAME, TITLE_TEMPLATE, CONTENT_TEMPLATE)
VALUES
(1, 'PAYMENT_SUCCESS',  '정기 결제 완료 안내',   '{닉네임}님의 정기 결제가 정상 처리되었습니다.'),
(2, 'ANSWER_COMPLETE',  '1:1 문의 답변 등록 안내', '{닉네임}님이 남기신 문의에 답변이 등록되었습니다.'),
(3, 'PARTY_START',      '파티 이용 시작 안내',    '참여 중인 OTT 파티 이용이 시작되었습니다.'),
(4, 'SETTLEMENT_DONE',  '정산 완료 안내',         '최근 이용한 파티에 대한 정산이 완료되었습니다.')
ON DUPLICATE KEY UPDATE TITLE_TEMPLATE = VALUES(TITLE_TEMPLATE);

INSERT INTO CATEGORY (CATEGORY_ID, CATEGORY_NAME)
VALUES
(1, 'AI'),
(2, 'MEDIA'),
(3, 'EDU'),
(4, 'MEMBER')
ON DUPLICATE KEY UPDATE CATEGORY_NAME = VALUES(CATEGORY_NAME);


INSERT INTO PRODUCT (PRODUCT_ID, CATEGORY_ID, PRODUCT_NAME, PRICE, IMAGE)
VALUES
(1, 1, 'Google AI Pro', 17000, '/img/product/netflix_premium.png'),
(2, 2, '디즈니+ 스탠다드', 10900, '/img/product/disney_standard.png'),
(3, 3, '왓챠 베이직',      7900,  '/img/product/watcha_basic.png'),
(4, 2, '유튜브 프리미엄', 13900, '/img/product/youtube_premium.png'),
(5, 1, '챗GPT 플러스',    29000, '/img/product/chatgpt_plus.png'),
(6, 3, '쿠팡플레이',       4990,  '/img/product/coupang_play.png'),
(7, 2, '티빙 스탠다드',   10900, '/img/product/tving_standard.png'),
(8, 3, '웨이브 프리미엄', 13900, '/img/product/wavve_premium.png'),
(9, 4, '멤버십 1개월권',   3000,  '/img/product/membership_1month.png'),
(10, 4, '멤버십 12개월권', 30000, '/img/product/membership_12month.png')
ON DUPLICATE KEY UPDATE PRODUCT_NAME = VALUES(PRODUCT_NAME);

-- --------------------------------------------
-- 1. USERS 
-- --------------------------------------------

INSERT INTO USERS (
    USER_ID, PASSWORD, NICKNAME, PHONE,
    PROFILE_IMAGE, ROLE, USER_STATUS, REG_DATE,
    CI, DI, PASS_CERTIFIED_AT, LAST_LOGIN_DATE,
    LOGIN_FAIL_COUNT, UNLOCK_SCHEDULED_AT,
    DELETE_DATE, DELETE_TYPE, DELETE_DETAIL
) VALUES
('user001@gmail.com', 'pwd1234', '사용자01', '01000000001', NULL, 'ADMIN', 'ACTIVE', CURDATE(), 'CI00001', 'DI00001', CURDATE(), CURDATE(), 0, NULL, NULL, NULL, NULL),
('user002@gmail.com', 'pwd1234', '사용자02', '01000000002', NULL, 'ADMIN', 'ACTIVE', CURDATE(), 'CI00002', 'DI00002', CURDATE(), CURDATE(), 0, NULL, NULL, NULL, NULL),
('user003@gmail.com', 'pwd1234', '사용자03', '01000000003', NULL, 'ADMIN', 'ACTIVE', CURDATE(), 'CI00003', 'DI00003', CURDATE(), CURDATE(), 0, NULL, NULL, NULL, NULL),
('user004@gmail.com', 'pwd1234', '사용자04', '01000000004', NULL, 'USER',  'ACTIVE', CURDATE(), 'CI00004', 'DI00004', CURDATE(), CURDATE(), 0, NULL, NULL, NULL, NULL),
('user005@gmail.com', 'pwd1234', '사용자05', '01000000005', NULL, 'USER',  'ACTIVE', CURDATE(), 'CI00005', 'DI00005', CURDATE(), CURDATE(), 0, NULL, NULL, NULL, NULL);



-- --------------------------------------------
-- 2. ACCOUNT (정산계좌) : 
-- --------------------------------------------

INSERT INTO ACCOUNT (
    USER_ID, BANK_CODE, BANK_NAME, ACCOUNT_NUMBER,
    ACCOUNT_HOLDER, IS_VERIFIED, REG_DATE, VERIFY_DATE
) VALUES
('user001@gmail.com', '004', 'KB국민은행', '100-01-000001', '사용자01', 'Y', NOW(), NOW()),
('user002@gmail.com', '088', '신한은행',   '100-02-000002', '사용자02', 'Y', NOW(), NOW()),
('user003@gmail.com', '020', '우리은행',   '100-03-000003', '사용자03', 'Y', NOW(), NOW()),
('user004@gmail.com', '081', '하나은행',   '100-04-000004', '사용자04', 'Y', NOW(), NOW()),
('user005@gmail.com', '003', '기업은행',   '100-05-000005', '사용자05', 'Y', NOW(), NOW());

-- --------------------------------------------
-- 3. USER_CARD (결제카드) : 
-- --------------------------------------------

INSERT INTO USER_CARD (
    USER_ID, BILLING_KEY, CARD_COMPANY, CARD_NUMBER, REG_DATE
) VALUES
('user001@gmail.com', 'BILLKEY001', 'KB국민카드', '4012-****-****-1001', NOW()),
('user002@gmail.com', 'BILLKEY002', '신한카드',   '5213-****-****-1002', NOW()),
('user003@gmail.com', 'BILLKEY003', '현대카드',   '5412-****-****-1003', NOW()),
('user004@gmail.com', 'BILLKEY004', '롯데카드',   '5312-****-****-1004', NOW()),
('user005@gmail.com', 'BILLKEY005', '삼성카드',   '5512-****-****-1005', NOW());

-- --------------------------------------------
-- 4. SUBSCRIPTION (구독) : 
-- --------------------------------------------

INSERT INTO SUBSCRIPTION (
    USER_ID, PRODUCT_ID, SUBSCRIPTION_STATUS,
    START_DATE, END_DATE, CANCEL_REASON, CANCEL_DATE
) VALUES
('user001@gmail.com', 1, 'ACTIVE',    DATE_SUB(CURDATE(), INTERVAL 90 DAY), NULL, NULL, NULL),
('user002@gmail.com', 1, 'ACTIVE',    DATE_SUB(CURDATE(), INTERVAL 60 DAY), NULL, NULL, NULL),
('user003@gmail.com', 2, 'ACTIVE',    DATE_SUB(CURDATE(), INTERVAL 45 DAY), NULL, NULL, NULL),
('user004@gmail.com', 2, 'ACTIVE',    DATE_SUB(CURDATE(), INTERVAL 30 DAY), NULL, NULL, NULL),
('user005@gmail.com', 3, 'ACTIVE',    DATE_SUB(CURDATE(), INTERVAL 25 DAY), NULL, NULL, NULL),
('user001@gmail.com', 1, 'CANCELLED', DATE_SUB(CURDATE(), INTERVAL 180 DAY), DATE_SUB(CURDATE(), INTERVAL 30 DAY), '요금 부담', DATE_SUB(CURDATE(), INTERVAL 30 DAY)),
('user002@gmail.com', 2, 'CANCELLED', DATE_SUB(CURDATE(), INTERVAL 150 DAY), DATE_SUB(CURDATE(), INTERVAL 20 DAY), '서비스 이용 감소', DATE_SUB(CURDATE(), INTERVAL 20 DAY)),
('user003@gmail.com', 3, 'ACTIVE',    DATE_SUB(CURDATE(), INTERVAL 15 DAY), NULL, NULL, NULL),
('user004@gmail.com', 1, 'ACTIVE',    DATE_SUB(CURDATE(), INTERVAL 50 DAY), NULL, NULL, NULL),
('user005@gmail.com', 3, 'ACTIVE',    DATE_SUB(CURDATE(), INTERVAL 70 DAY), NULL, NULL, NULL);


-- --------------------------------------------
-- 5. PARTY (파티) : 
-- --------------------------------------------

INSERT INTO PARTY (
    SUBSCRIPTION_ID, PARTY_LEADER_ID, PARTY_STATUS,
    MAX_MEMBERS, CURRENT_MEMBERS, MONTHLY_FEE,
    OTT_ID, OTT_PASSWORD, ACCOUNT_ID,
    REG_DATE, START_DATE, END_DATE
) VALUES
(1, 'user001@gmail.com', 'ACTIVE',     7, 7, 5000, 'netflix_party_001', 'net!1234', 1, DATE_SUB(NOW(), INTERVAL 40 DAY), DATE_SUB(NOW(), INTERVAL 30 DAY), NULL),
(8, 'user002@gmail.com', 'ACTIVE',     7, 7, 5000, 'disney_party_008',  'dis!2345', 2, DATE_SUB(NOW(), INTERVAL 20 DAY), DATE_SUB(NOW(), INTERVAL 15 DAY), NULL),
(5, 'user005@gmail.com', 'RECRUITING', 6, 6, 6000, 'watcha_party_005',  'wat!3456', 3, DATE_SUB(NOW(), INTERVAL 60 DAY), DATE_SUB(NOW(), INTERVAL 55 DAY), NULL);

-- PARTY_ID 가 1,2,3 으로 들어간다고 가정

-- --------------------------------------------
-- 6. PARTY_MEMBER : 
-- --------------------------------------------

INSERT INTO PARTY_MEMBER (
    PARTY_ID, USER_ID, MEMBER_ROLE, MEMBER_STATUS, JOIN_DATE, WITHDRAW_DATE
) VALUES
(1, 'user001@gmail.com', 'LEADER', 'ACTIVE', DATE_SUB(NOW(), INTERVAL 30 DAY), NULL),
(1, 'user002@gmail.com', 'MEMBER', 'ACTIVE', DATE_SUB(NOW(), INTERVAL 28 DAY), NULL),
(1, 'user003@gmail.com', 'MEMBER', 'ACTIVE', DATE_SUB(NOW(), INTERVAL 27 DAY), NULL),
(1, 'user004@gmail.com', 'MEMBER', 'ACTIVE', DATE_SUB(NOW(), INTERVAL 26 DAY), NULL),
(1, 'user005@gmail.com', 'MEMBER', 'ACTIVE', DATE_SUB(NOW(), INTERVAL 25 DAY), NULL),
(1, 'user006@gmail.com', 'MEMBER', 'ACTIVE', DATE_SUB(NOW(), INTERVAL 24 DAY), NULL),
(1, 'user007@gmail.com', 'MEMBER', 'ACTIVE', DATE_SUB(NOW(), INTERVAL 23 DAY), NULL),

-- --------------------------------------------
-- 7. COMMUNITY (실제 질문/공지 느낌)
-- --------------------------------------------

INSERT INTO COMMUNITY (
    USER_ID, COMMUNITY_CODE_ID, TITLE, CONTENT,
    CREATED_AT, VIEW_COUNT, ANSWER_CONTENT, ANSWERED_AT, ANSWER_STATUS
) VALUES
('user001@gmail.com', 3, '넷플릭스 파티 결제 금액 문의 01', '넷플릭스 파티에서 이번 달 결제 금액이 예상보다 많이 나온 것 같아 상세 내역을 확인하고 싶습니다.', DATE_SUB(NOW(), INTERVAL 50 HOUR), 34, '결제 내역과 정산 내역을 다시 안내드렸습니다. 보증금은 별도로 유지되고 있습니다.', DATE_SUB(NOW(), INTERVAL 48 HOUR), '답변완료'),
('user002@gmail.com', 3, '보증금 환급 처리 기준 문의 02', '파티 탈퇴 시 보증금이 언제, 어떤 기준으로 환급되는지 알고 싶습니다.', DATE_SUB(NOW(), INTERVAL 49 HOUR), 21, '보증금은 파티 종료 후 이상 사용 내역이 없을 경우 일괄 환급됩니다.', DATE_SUB(NOW(), INTERVAL 46 HOUR), '답변완료'),
('user003@gmail.com', 3, '계정 공유 시 동시 접속 인원 관련 03', '넷플릭스 계정을 파티원과 공유할 때 동시 접속 인원이 초과되면 어떻게 되나요?', DATE_SUB(NOW(), INTERVAL 48 HOUR), 40, NULL, NULL, '답변대기'),
('user004@gmail.com', 3, '정기 결제일 변경 가능 여부 04', '지금은 말일에 결제가 되는데, 월 중순으로 결제일을 바꾸고 싶습니다.', DATE_SUB(NOW(), INTERVAL 47 HOUR), 18, '결제일 변경은 다음 달부터 적용 가능하며, 중간에 부분 청구가 발생할 수 있습니다.', DATE_SUB(NOW(), INTERVAL 44 HOUR), '답변완료'),
('user005@gmail.com', 3, '파티 재참여 제한 여부 05', '한 번 탈퇴한 파티에 다시 재참여가 가능한지 궁금합니다.', DATE_SUB(NOW(), INTERVAL 46 HOUR), 13, NULL, NULL, '답변대기'),
('user001@gmail.com', 3, '디즈니+ 화질 설정 관련 문의 06', '파티를 통해 디즈니+를 이용 중인데, 화질 설정이 자꾸 자동으로 바뀝니다.', DATE_SUB(NOW(), INTERVAL 45 HOUR), 27, '네트워크 상태에 따라 자동으로 화질이 조정될 수 있습니다. 기기 설정도 함께 확인 부탁드립니다.', DATE_SUB(NOW(), INTERVAL 42 HOUR), '답변완료'),
('user002@gmail.com', 3, '왓챠 프로필 추가 기준 07', '왓챠에서 프로필을 몇 개까지 만들 수 있는지 알고 싶습니다.', DATE_SUB(NOW(), INTERVAL 44 HOUR), 9, NULL, NULL, '답변대기'),
('user003@gmail.com', 3, '파티장 변경 가능 여부 08', '현재 파티장을 다른 파티원에게 양도할 수 있는지 궁금합니다.', DATE_SUB(NOW(), INTERVAL 43 HOUR), 31, '보증금과 정산 계좌 주인을 기준으로 파티장 변경 가능 여부가 결정됩니다.', DATE_SUB(NOW(), INTERVAL 40 HOUR), '답변완료'),
('user004@gmail.com', 3, '휴대폰 번호 변경 후 인증 문제 09', '번호를 변경했더니 본인인증이 계속 실패합니다.', DATE_SUB(NOW(), INTERVAL 42 HOUR), 17, NULL, NULL, '답변대기');

-- --------------------------------------------
-- 8. PUSH 
-- --------------------------------------------

-- 1) 결제 완료 알림 
INSERT INTO PUSH (
    RECEIVER_ID, PUSH_CODE, TITLE, CONTENT,
    MODULE_ID, MODULE_TYPE, SENT_AT, READ_AT, IS_READ, IS_DELETED
) VALUES
('user001@gmail.com', 'PAYMENT_SUCCESS', '정기 결제 완료 안내', '이번 달 넷플릭스 파티 이용료 결제가 정상 처리되었습니다.', NULL, 'PAYMENT', DATE_SUB(NOW(), INTERVAL 10 HOUR), DATE_SUB(NOW(), INTERVAL 9 HOUR), 'Y', 'N'),
('user002@gmail.com', 'PAYMENT_SUCCESS', '정기 결제 완료 안내', '이번 달 넷플릭스 파티 이용료 결제가 정상 처리되었습니다.', NULL, 'PAYMENT', DATE_SUB(NOW(), INTERVAL 10 HOUR), DATE_SUB(NOW(), INTERVAL 9 HOUR), 'Y', 'N'),
('user003@gmail.com', 'PAYMENT_SUCCESS', '정기 결제 완료 안내', '이번 달 디즈니+ 파티 이용료 결제가 정상 처리되었습니다.', NULL, 'PAYMENT', DATE_SUB(NOW(), INTERVAL 10 HOUR), DATE_SUB(NOW(), INTERVAL 9 HOUR), 'Y', 'N'),
('user004@gmail.com', 'PAYMENT_SUCCESS', '정기 결제 완료 안내', '이번 달 디즈니+ 파티 이용료 결제가 정상 처리되었습니다.', NULL, 'PAYMENT', DATE_SUB(NOW(), INTERVAL 9 HOUR), DATE_SUB(NOW(), INTERVAL 8 HOUR), 'Y', 'N'),
('user005@gmail.com', 'PAYMENT_SUCCESS', '정기 결제 완료 안내', '이번 달 왓챠 파티 이용료 결제가 정상 처리되었습니다.', NULL, 'PAYMENT', DATE_SUB(NOW(), INTERVAL 9 HOUR), DATE_SUB(NOW(), INTERVAL 8 HOUR), 'Y', 'N');

