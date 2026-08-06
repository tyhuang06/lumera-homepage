// ─── Gifting page picks ────────────────────────────────────────────────────
// Pulled out of GiftingPage.tsx so scripts/prerender.ts can build accurate
// static shell content for /gifting without duplicating this list. Edit
// here; both the live page and the prerendered shell read from this file.
// ─────────────────────────────────────────────────────────────────────────────

// Curated gift picks — all under $300. To change what shows up, edit this list.
export const GIFT_PICK_IDS: string[] = [
	'ring-akoya-ring-3.0mm', // Lumie Signature - Akoya Smile Ring
	'necklace-akoya-keshi', // Nature Forever - Akoya Keshi Classic Necklace
	'earrings-akoya-hanadama-8.0mm', // Lumie Signature - Akoya Classic Earrings (Hanadama 8.0mm)
	'earrings-akoya-bluerose', // Lumie Signature - Akoya Blue Rose Earrings (8.0mm)
	'earclip-8.0mm', // Lumie Signature - Akoya Classic Ear Clip (8.0mm)
	'earrings-akoya-loveshaped', // Lumie Signature - Akoya Love Earrings
	'earrings-akoya-tie', // Lumie Signature - Akoya Ribbon Earrings
	'earrings-southsea-9.0mm-feather', // Soul Signature - South Sea Plume Earrings
	'earclip-bluerose', // Lumie Signature - Akoya Blue Rose Ear Clip
	'tahitian-peacock-8mm', // Eclipse Signature - Tahitian Peacock Green Earrings (8.0mm)
	'tahitian-sparkle', // Eclipse Signature - Tahitian Sparkle Earrings
];

// Premium necklace picks, shown below the best-value section.
export const PREMIUM_PICK_IDS: string[] = [
	'necklace-akoya-5.5mm', // Lumie Signature - Akoya Classic Necklace (5.5mm)
	'necklace-m-akoya-8.5mm', // Lumie Forever - Akoya Classic Necklace (8.0-8.5mm)
	'necklace-southsea-8.0-10.0', // Soul Forever - South Sea Classic Necklace (8.0-10.0mm)
	'necklace-m-akoya-3.5', // Lumie Forever - Baby Akoya Necklace (Hanadama 3.5mm)
	'bracelets-southsea', // Soul Forever - South Sea Classic Bracelet
];
