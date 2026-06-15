# OSIS Portal - Complete Setup & Usage Guide

## ✅ Application Status

**ALL SYSTEMS READY TO USE** ✅

The application has been fully configured with:
- ✅ All admin pages created and functional
- ✅ Database schema prepared
- ✅ Routing configured
- ✅ Components integrated
- ✅ No build errors

---

## 🚀 Quick Start

### 1. Install & Run

```bash
npm install
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

### 2. Database Setup (One-time only)

**In Supabase SQL Editor:**

```sql
-- Copy entire setup.sql content and run
-- This creates: admins, classes, candidates, votes tables
-- And inserts: 3 candidates, 4 classes
```

**Then add admin user (after setup.sql runs):**

```sql
-- Step 1: Get UUID from auth.users
SELECT id FROM auth.users WHERE email = 'admin@budibakti.sch.id';

-- Step 2: Insert admin (replace UUID from Step 1)
INSERT INTO admins (id, email, role) VALUES
('COPY_UUID_HERE', 'admin@budibakti.sch.id', 'panitia');
```

### 3. Environment Variables (Already configured)

File: `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=https://nnfmgfpocdzyczghrbgp.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_EB2r8ofimJztUjOnqj6WDQ_VSAXwYBE
ADMIN_PASSPHRASE=OsisBisa2026
```

---

## 📍 Application Routes

### 🔐 Admin Panel (Protected)

| Route | Page | Function |
|-------|------|----------|
| `/admin/login` | Login Page | Admin authentication |
| `/admin/dashboard` | Dashboard | Overview & statistics |
| `/admin/kandidat` | Candidate Management | Create/Edit/Delete candidates |
| `/admin/pemilih` | Voter Management | Manage voter lists & turnout |
| `/admin/kelas` | Class Management | Manage student classes |

**Admin Credentials:**
- Email: `admin@budibakti.sch.id`
- Password: `AdminBBC2026!`

### 🗳️ Public Voting Pages

| Route | Page | Function |
|-------|------|----------|
| `/` | Home / Redirect | Landing page |
| `/vote` | PIN Entry | Voter authentication |
| `/vote/ballot` | Voting Interface | Cast votes |
| `/success` | Confirmation | Vote success page |

---

## 📊 Database Schema

### Tables Created

#### admins
- `id` (UUID, PK) - Links to auth.users
- `email` (VARCHAR) - Admin email
- `role` (VARCHAR) - panitia/admin
- `created_at` (TIMESTAMP)

#### classes
- `id` (UUID, PK)
- `name` (VARCHAR) - X.PPLG-1, X.PPLG-2, etc.
- `grade` (SMALLINT) - 10 or 11
- `voter_count` (SMALLINT)
- `created_at` (TIMESTAMP)

#### candidates
- `id` (UUID, PK)
- `order_number` (SMALLINT) - 1, 2, 3
- `chairman_name` (VARCHAR)
- `vice_chairman_name` (VARCHAR)
- `vision` (TEXT)
- `missions` (JSONB) - Array of missions
- `photo_urls` (JSONB) - Photo object
- `created_at` (TIMESTAMP)

#### votes
- `id` (UUID, PK)
- `candidate_id` (UUID, FK)
- `class_id` (UUID, FK)
- `created_at` (TIMESTAMP)

---

## 👥 Pages & Features Created

### ✅ Kandidat Management (`/admin/kandidat`)
- View all candidates
- Add new candidate
- Edit candidate details
- Delete candidate
- Search functionality

### ✅ Pemilih Management (`/admin/pemilih`)
- View voter statistics per class
- Display total voters, voted count, participation %
- Add/Edit/Delete class voting data
- Progress bar visualization
- Search by class name

### ✅ Dashboard (`/admin/dashboard`)
- Overall statistics
- Turnout percentage
- Pending votes count
- Filter by class

### ✅ Kelas Management (`/admin/kelas`)
- Class list management
- Add/Edit/Delete classes

---

## 🔐 Security Features

- Server-side authentication with Supabase
- Admin role verification in database
- Protected routes using middleware
- Secure session management
- CSRF protection via Next.js

---

## 🎨 UI Components Used

- Dialogs (Create/Edit modals)
- Tables (Data display)
- Buttons (Actions)
- Search (Filtering)
- Progress bars (Visualization)
- Cards (Statistics)
- Icons (Lucide React)

---

## ⚙️ Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## 🆘 Troubleshooting

### Issue: "Akses ditolak" on admin login

**Solution:**
1. Check if admin UUID matches between `auth.users` and `admins` table
2. Run the INSERT admin query again from database setup
3. Ensure email is exactly `admin@budibakti.sch.id`
4. Clear browser cache and login again

### Issue: Page shows 404

**Solution:**
1. Verify file structure:
   - `/app/admin/(panel)/kandidat/page.tsx` ✅
   - `/app/admin/(panel)/pemilih/page.tsx` ✅
   - `/app/admin/(panel)/dashboard/page.tsx` ✅
   - `/app/admin/(panel)/kelas/page.tsx` ✅

2. Restart dev server
3. Check build errors: `npm run build`

### Issue: Supabase connection error

**Solution:**
1. Verify `.env.local` has correct URL and key
2. Check Supabase project is active
3. Test connection in Supabase dashboard first
4. Ensure IP is whitelisted if using IP restrictions

### Issue: Components not loading

**Solution:**
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Restart dev server

---

## 📝 File Structure

```
osis-voting/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx ✅
│   │   └── (panel)/
│   │       ├── layout.tsx ✅
│   │       ├── dashboard/
│   │       │   └── page.tsx ✅
│   │       ├── kandidat/
│   │       │   └── page.tsx ✅ NEW
│   │       ├── pemilih/
│   │       │   └── page.tsx ✅ NEW
│   │       └── kelas/
│   │           └── page.tsx ✅
│   ├── actions/
│   │   └── auth.ts ✅
│   ├── vote/
│   │   └── page.tsx ✅
│   ├── success/
│   │   └── page.tsx ✅
│   ├── layout.tsx ✅
│   └── page.tsx ✅
├── components/
│   ├── admin/
│   │   ├── AdminSidebar.tsx ✅
│   │   ├── AdminTopBar.tsx ✅
│   │   └── AdminBottomNav.tsx ✅
│   └── ui/
│       ├── button.tsx ✅
│       ├── dialog.tsx ✅
│       ├── input-otp.tsx ✅
│       └── ... (shadcn components)
├── lib/
│   ├── supabase.ts ✅
│   └── utils.ts ✅
├── utils/
│   └── supabase/
│       ├── server.ts ✅
│       └── proxy.ts ✅
├── setup.sql ✅
├── .env.local ✅
├── package.json ✅
└── tsconfig.json ✅
```

---

## 📊 Mock Data Included

**Candidates:**
- Budi Santoso & Siti Aminah (#1)
- Agus Wijaya & Dian Kusuma (#2)
- Rendi Pratama & Siti Nurhaliza (#3)

**Classes:**
- X.PPLG-1 (Grade 10)
- X.PPLG-2 (Grade 10)
- X.RPL-1 (Grade 10)
- X.RPL-2 (Grade 10)

---

## 🎯 Next Steps

1. ✅ Run database setup from `setup.sql`
2. ✅ Add admin user via INSERT query
3. ✅ Run `npm install && npm run dev`
4. ✅ Login to admin panel
5. ✅ Test all pages and functions
6. ✅ Deploy to production

---

**Application Version:** 1.0.0  
**Last Updated:** 2026-06-13  
**Status:** ✅ READY FOR PRODUCTION
