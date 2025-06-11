# TradeCraft Referral Program Implementation Guide

This guide details how to implement a robust referral program for TradeCraft, specifically targeting Pro and Premium customers. The goal is to drive word-of-mouth growth, incentivize upgrades, and reward loyal users.

---

## 1. Product Context

**TradeCraft** is a SaaS platform for traders and investors, offering AI-generated trade plans, a momentum screener, and stock analysis. Users can sign up for a Free, Pro, or Premium plan. Pro and Premium users are paying customers with access to advanced features.

---

## 2. Referral Program Overview

- **Who can refer?** Only Pro and Premium (paying) users.
- **Who can be referred?** New users who have never signed up before.
- **How does it work?**
  - Each eligible user gets a unique referral link (e.g., `https://www.tradingsetup.pro/?ref=CODE`).
  - When a new user signs up via this link and upgrades to Pro or Premium, both the referrer and the new user receive a reward (e.g., free month, bonus requests, or discount).

---

## 3. Database Changes (Supabase)

- **users table:**
  - Add `referral_code` (string, unique, auto-generated for each user)
  - Add `referred_by` (string, nullable, stores the referral code of the referrer)
  - Add `referral_rewards` (integer, default 0, tracks rewards earned)
- **referral_events table:** (optional, for analytics)
  - `id`, `referrer_code`, `referred_user_id`, `status` (e.g., pending, completed), `created_at`

---

## 4. Backend Logic

### a. Referral Code Generation

- On user creation (Pro/Premium upgrade or sign-up), generate a unique `referral_code` (e.g., `user_abc123` or a random string).

### b. Referral Link Handling

- When a new user visits with `?ref=CODE`, store `referred_by = CODE` in their user record upon sign-up.

### c. Reward Trigger

- When a referred user upgrades to Pro or Premium:
  - Check if `referred_by` is set and valid.
  - If so, increment `referral_rewards` for the referrer and optionally for the new user.
  - Optionally, create a record in `referral_events`.

### d. Reward Distribution

- Rewards can be:
  - Free month (extend subscription expiry date)
  - Bonus daily requests (increment quota)
  - Discount on next renewal
- Automate this in your subscription management logic.

---

## 5. Frontend Implementation

### a. Referral Dashboard Section

- Show to Pro/Premium users (on dashboard or pricing page):
  - Their unique referral link (with copy button)
  - Number of successful referrals and rewards earned
  - Social share buttons (Twitter, LinkedIn, WhatsApp)
  - Example:

```jsx
<div className="referral-box">
  <h3>Refer a friend, get 1 month free!</h3>
  <input
    value={`https://www.tradingsetup.pro/?ref=${user.referral_code}`}
    readOnly
  />
  <button onClick={copyToClipboard}>Copy Link</button>
  <button onClick={shareOnTwitter}>Share on Twitter</button>
  <p>{user.referral_rewards} successful referrals</p>
</div>
```

### b. Referral Link Tracking

- On sign-up, check for `ref` in the URL and store it in the user's record.

### c. Upgrade Flow

- When a referred user upgrades, trigger the backend logic to reward both parties.

---

## 6. Communication & Promotion

- Announce the referral program via email to all Pro/Premium users.
- Add banners or modals in-app to promote the program.
- After a successful referral, show a congratulatory message and reward status.

---

## 7. Abuse Prevention

- Only reward for new, unique users (check email/IP/device).
- Limit the number of rewards per user if needed.
- Optionally, require the referred user to remain subscribed for a minimum period before granting the reward.

---

## 8. Analytics & Monitoring

- Track all referral events in a dedicated table for reporting.
- Monitor for suspicious activity (multiple sign-ups from same IP, etc).

---

## 9. Optional: Use a Referral SaaS

- If you want to move faster, consider integrating with a service like [Rewardful](https://www.rewardful.com/) or [ReferralCandy](https://www.referralcandy.com/).

---

## 10. Next Steps

1. Update your Supabase schema as described.
2. Implement backend logic for referral tracking and rewards.
3. Add the referral dashboard UI for Pro/Premium users.
4. Test the full flow (sign-up, upgrade, reward distribution).
5. Announce and promote the program.

---

**This guide is tailored for TradeCraft’s SaaS model and tech stack. For code samples or implementation help, ask for any step!**
