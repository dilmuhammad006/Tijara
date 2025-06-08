# Istalgan mahsulot va buyumlarni bir zumda istalgan joydan sota olish imkonini beradigan loyiha!

## Funksional talablar:

- User Register qilihi
- User login qilishi
- Google va Facebook orqali qulay tizimga kirish
- Token orqali tizimdagi barqarorlik
- Platformadagi barcha elonlrni kora olishi
- Platformadagi yotqtirgan eloniga like bosishi
- Yangi elon joylay olishi
- O'z e'lonlarini yangilay olishi
- Platforma bo'ylab qulay qidiruv tizimi
- Istalgan valyutada sotish(USD, UZS, EURO, RUBL)

## No funksional talablar:

- Elonlar doim yangilab va kengaytirilib borilishi.
- Refresh token orqali acces token vaqtini uzaytirish va tizimda barqaror ushlash.
- Tezlik.
- Havfsizlik.

## Malumotlar:

1. User:

- id
- name
- email
- password
- role

2. Announcement:

- id
- name
- description
- images
- price
- createdAt
- location
- category

3. Category

- id
- name
- annoucment

4. Liked

- id
- UserId
- AnnouncementID
- createdAt

5. Last seen

- id
- UserId
- AnnouncementID
- createdAt
