// ==========================================================================
// GEMINI AI INTEGRATION ENGINE FOR BIRTHDAY WEBSITE
// Automatically fixes spelling errors, polishes phrases & enriches with emojis
// Now with Intelligent AI Emoji & Icon Matching for Scratch Passes!
// ==========================================================================

// Provide your Gemini API Key via window.__GEMINI_API_KEY__ or localStorage.getItem('GEMINI_API_KEY')
const GEMINI_API_KEY = (typeof window !== 'undefined' && (window.__GEMINI_API_KEY__ || localStorage.getItem('GEMINI_API_KEY'))) || '';
// Fast, ultra-responsive models supported by current API endpoint
const GEMINI_MODELS = ['gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-3.5-flash'];

class GeminiBirthdayAssistant {
    constructor(apiKey = GEMINI_API_KEY) {
        this.apiKey = apiKey;
        this.selectedTone = 'Romantic'; // Default: 'Romantic', 'Bestie', 'Warm', 'Poetic'
        this.models = GEMINI_MODELS;
    }

    setTone(tone) {
        this.selectedTone = tone;
    }

    cleanText(rawText) {
        if (!rawText) return '';
        let cleaned = rawText.trim();
        // Remove markdown code blocks if any
        cleaned = cleaned.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
        
        // If the model formatted as "Option 1: ..." or "Draft 1: ...", take the first option
        const optionMatch = cleaned.match(/(?:Option\s*1|Draft\s*1)[:\s*]+["“]?([^"”\n\r]+)/i);
        if (optionMatch && optionMatch[1]) {
            cleaned = optionMatch[1].trim();
        } else {
            // Remove conversational introductory line if present
            const lines = cleaned.split('\n').map(l => l.trim()).filter(Boolean);
            if (lines.length > 1 && /^(here\s+(is|are)|polished|version|option)/i.test(lines[0])) {
                cleaned = lines.slice(1).join('\n');
            }
        }

        // Remove wrapping quotes
        cleaned = cleaned.replace(/^["'“”«»]+|["'“”«»]+$/g, '').trim();
        return cleaned;
    }

    cleanEmoji(rawText) {
        if (!rawText) return '';
        let cleaned = rawText.trim();
        // Remove markdown, quotes, brackets, explanation text
        cleaned = cleaned.replace(/`+|"+|'+|“|”|«|»/g, '').trim();
        // Extract emojis using standard emoji unicode matcher regex
        const emojiRegex = /(\p{Extended_Pictographic}(?:\u200d\p{Extended_Pictographic})*[\ufe0e\ufe0f]?)/gu;
        const matches = cleaned.match(emojiRegex);
        if (matches && matches.length > 0) {
            // Return at most 2 emojis
            return matches.slice(0, 2).join('');
        }
        // Fallback: remove non-emoji letters
        cleaned = cleaned.replace(/[a-zA-Z0-9\s:.,!?-]/g, '');
        return cleaned.slice(0, 4);
    }

    // Comprehensive semantic & keyword dictionary covering 100+ concepts
    // Works instantly (0ms latency) and serves as an unbeatable local AI fallback
    matchEmojiSemantically(text) {
        if (!text || !text.trim()) return '🎟️';
        const t = text.toLowerCase().trim();

        // Affection & Romance
        if (/hug|cuddle|jhappi|gale|embrace|snuggle|warmth/.test(t)) return '🫂❤️';
        if (/kiss|smooch|chumma|pappi|pout|lips/.test(t)) return '💋🥰';
        if (/candlelight|date\s*night|romantic|candle|romance|pyaar|mohabbat|ishq|soulmate|forever/.test(t)) return '💖🕯️';
        if (/ring|propose|marry|wedding|engagement/.test(t)) return '💍✨';
        if (/flower|rose|gulab|bouquet|dais|tulip/.test(t)) return '🌹💐';

        // Food, Bakery, Treats
        if (/coffee|cafe|cappuccino|espresso|latte|starbucks|croissant/.test(t)) return '☕🥐';
        if (/tea|chai|tapri|kadak/.test(t)) return '🍵🫖';
        if (/cake|pastry|cupcake|mithai|brownie|dessert|bakery/.test(t)) return '🍰🧁';
        if (/ice\s*cream|gelato|popsicle|sundae|kulfi|cone/.test(t)) return '🍦🍨';
        if (/pizza|slice|margherita|cheesy/.test(t)) return '🍕✨';
        if (/burger|fries|fast\s*food|mcd|mcdonalds|kfc/.test(t)) return '🍔🍟';
        if (/momos|street\s*food|chaat|golgappa|pani\s*puri|maggi|noodle/.test(t)) return '🥟🍜';
        if (/dinner|lunch|buffet|restaurant|food|khaana|khana|meal|eat|dine|pasta|taco/.test(t)) return '🍽️🍷';
        if (/chocolate|cadbury|dairy\s*milk|candy/.test(t)) return '🍫🍬';
        if (/drink|beer|wine|cheers|cocktail|mocktail|champagne|party\s*night/.test(t)) return '🥂🎉';

        // Activities & Entertainment
        if (/movie|netflix|cinema|film|popcorn|binge|theater|show|series|anime/.test(t)) return '🎬🍿';
        if (/drive|road\s*trip|car|ride|highway|ghoomna|long\s*drive|sunset\s*drive/.test(t)) return '🚗💨';
        if (/bike|scooter|bullet|ride/.test(t)) return '🏍️💨';
        if (/shop|mall|clothes|outfit|spree|kharidari|buy|zara|h&m|haul/.test(t)) return '🛍️💳';
        if (/game|gaming|playstation|ps5|xbox|arcade|nintendo|valorant|pubg|fifa/.test(t)) return '🎮🕹️';
        if (/music|concert|song|guitar|sing|dance|playlist|karaoke|spotify/.test(t)) return '🎵🎸';
        if (/picnic|garden|park|meadow/.test(t)) return '🧺🥪';
        if (/photo|photoshoot|polaroid|camera|picture|pose|selfie/.test(t)) return '📸✨';
        if (/book|read|library|novel|poetry|write|study/.test(t)) return '📚☕';
        if (/gym|workout|fitness|exercise|yoga/.test(t)) return '🏋️‍♂️💪';

        // Relaxation & Pampering
        if (/massage|spa|salon|pamper|relax|sauna|foot\s*massage|head\s*massage/.test(t)) return '💆‍♀️🫧';
        if (/sleep|nap|snooze|midnight|bed|sleepover|so\s*ja|rest/.test(t)) return '🌙💤';
        if (/call|gossip|rant|vent|phone|secret|chitchat|baat|tea\s*spill/.test(t)) return '📞🤫';

        // Travel & Escapes
        if (/travel|flight|vacation|holiday|beach|trip|adventure|resort|flight|airport|goa|bali/.test(t)) return '✈️🏖️';
        if (/star|galaxy|stargazing|sky|night\s*sky|constellation|astronomy/.test(t)) return '🌌🔭';
        if (/beach|ocean|waves|sea|sunset\s*beach/.test(t)) return '🌅🏖️';

        // Wishes, Magic & Special
        if (/wish|genie|grant|golden|khwahish|miracle|magic|universal|secret\s*favor/.test(t)) return '🧞‍♂️✨';
        if (/gift|surprise|present|tofa|tohf/.test(t)) return '🎁✨';
        if (/queen|king|crown|princess|vip|royalty/.test(t)) return '👑✨';
        if (/pet|dog|cat|puppy|kitten|doggo/.test(t)) return '🐶🐾';
        if (/party|celebrate|celebration|jashn/.test(t)) return '🥳🎉';

        // Default aesthetic surprise emoji
        return '🎟️✨';
    }

    // AI-Powered Emoji Suggester:
    // Uses fast Gemini model to pick the most context-aware emoji for the pass title,
    // with instantaneous semantic fallback if offline or during network latency.
    async suggestEmojiForTitle(title) {
        if (!title || !title.trim()) return '🎟️';
        const cleanTitle = title.trim();

        // Try Gemini models with strict 3.5s timeout for ultra-snappy UX
        for (const model of this.models) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3500);

                const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
                const prompt = `System: You are an internal aesthetic emoji and icon matcher for surprise gift passes and coupons.
Task: Output ONLY 1 or 2 complementary emojis that best symbolize the pass title: "${cleanTitle}".
Examples:
- "Unlimited Free Hugs" -> 🫂❤️
- "Midnight Food & Cafe Date" -> ☕🍰
- "Late Night Long Drive" -> 🚗💨
- "The Universal Wish Pass" -> 🧞‍♂️✨
- "Shopping Spree" -> 🛍️💳
- "Netflix & Pizza Binge" -> 🍕🍿
- "Relaxing Spa & Massage" -> 💆‍♀️🫧
- "Candlelight Rooftop Dinner" -> 🕯️🍷
- "2 AM Secret Gossip Call" -> 📞🤫
- "Sunset Beach Walk" -> 🌅🏖️
Rules:
1. Output ONLY 1 or 2 emojis.
2. Absolutely NO explanatory words, NO quotes, NO punctuation.`;

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    signal: controller.signal,
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.2,
                            maxOutputTokens: 20
                        }
                    })
                });
                clearTimeout(timeoutId);

                if (response.ok) {
                    const data = await response.json();
                    const rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (rawOutput) {
                        const parsedEmoji = this.cleanEmoji(rawOutput);
                        if (parsedEmoji) {
                            return parsedEmoji;
                        }
                    }
                }
            } catch (err) {
                // Silently fallback to next model or local semantic engine
            }
        }

        // Always succeed with smart semantic knowledge base
        return this.matchEmojiSemantically(cleanTitle);
    }

    // Generate complete Scratch Pass (Emoji + Secret Reward + Code) from Title
    async generateCompletePass(title, tone = this.selectedTone) {
        const cleanTitle = (title || '').trim();
        const fallbackEmoji = this.matchEmojiSemantically(cleanTitle);
        const localTemplate = this.getLocalPassTemplate(cleanTitle, tone);

        if (!cleanTitle) {
            return localTemplate;
        }

        const prompt = `System: You are an internal birthday surprise scratch coupon creator.
Task: Given the Pass Title: "${cleanTitle}" and Tone: "${tone}".
Generate:
1. emoji: 1-2 complementary matching emojis (e.g. 🚗💨, ☕🍰, 🫂❤️, 🍕🎬, 🛍️💳, 🍦🍨, 💆‍♀️🫧, 🧞‍♂️✨).
2. desc: A 1-2 sentence fun, heartfelt secret redeemable reward message (e.g. "Valid 24/7! Late night long drive with windows rolled down and favorite songs on repeat. Zero excuses allowed! ✨").
3. code: A short uppercase redemption code starting with "CODE: " (e.g. "CODE: LONG-DRIVE-247").

CRITICAL: Return ONLY a valid JSON object matching this exact structure:
{"emoji": "...", "desc": "...", "code": "..."}
No markdown backticks, no explanations.`;

        for (const model of this.models) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 4000);

                const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    signal: controller.signal,
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 220
                        }
                    })
                });
                clearTimeout(timeoutId);

                if (response.ok) {
                    const data = await response.json();
                    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (rawText) {
                        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
                        if (jsonMatch) {
                            const parsed = JSON.parse(jsonMatch[0]);
                            if (parsed.desc) {
                                return {
                                    emoji: this.cleanEmoji(parsed.emoji) || fallbackEmoji,
                                    desc: parsed.desc.trim(),
                                    code: (parsed.code || localTemplate.code).toUpperCase().trim()
                                };
                            }
                        }
                    }
                }
            } catch (err) {
                // Fallback to next model or local template
            }
        }

        return localTemplate;
    }

    getLocalPassTemplate(title, tone = 'Romantic') {
        const t = (title || '').toLowerCase().trim();
        const codeBase = title ? title.toUpperCase().replace(/[^A-Z0-9]/g, '-').slice(0, 14) : 'SPECIAL-WISH';
        const defaultCode = `CODE: ${codeBase}-100`;

        if (/drive|road|car|highway|ride/.test(t)) {
            return {
                emoji: '🚗💨',
                desc: 'Valid 24/7! Windows rolled down, cool night breeze, favorite songs playing on loop, and late-night highway chai. Zero excuses allowed! 🌙✨',
                code: 'CODE: NIGHT-DRIVE-247'
            };
        }
        if (/coffee|cafe|tea|chai|starbucks|matcha/.test(t)) {
            return {
                emoji: '☕🍰',
                desc: 'All coffee, iced matcha, pastries, and cozy cafe dates on me, anywhere you choose, whenever you want! 🥐💛',
                code: 'CODE: CAFE-DATE-ON-ME'
            };
        }
        if (/hug|cuddle|warmth|kiss|love/.test(t)) {
            return {
                emoji: '🫂❤️',
                desc: 'Valid 24/7 for whenever you need a listening ear, tight comfort embrace, or warm comforting hug! Zero questions asked! 💕',
                code: 'CODE: UNLIMITED-HUGS'
            };
        }
        if (/food|dinner|pizza|momos|burger|khaana|khana|biryani|buffet/.test(t)) {
            return {
                emoji: '🍕🍷',
                desc: 'Full meal or late-night street food cravings at your favorite spot, completely on my tab whenever your cravings hit! 🍽️✨',
                code: 'CODE: TREAT-ON-ME'
            };
        }
        if (/movie|netflix|cinema|binge|film|show/.test(t)) {
            return {
                emoji: '🎬🍿',
                desc: 'A cozy movie marathon night with your choice of film, endless butter popcorn, snacks, and zero interruptions! 🛋️✨',
                code: 'CODE: MOVIE-NIGHT-VIP'
            };
        }
        if (/ice\s*cream|gelato|dessert|sweet/.test(t)) {
            return {
                emoji: '🍦🍨',
                desc: 'A late-night ice cream run to hunt down your favorite flavors under city lights whenever you feel like dessert! 🌙',
                code: 'CODE: ICE-CREAM-RUN'
            };
        }
        if (/wish|magic|favor|universal|golden|anything/.test(t)) {
            return {
                emoji: '🧞‍♂️✨',
                desc: 'Ask me for anything — a sudden adventure, a secret favor, or any wish granted unconditionally with zero questions asked! 🌟',
                code: 'CODE: WISH-GRANTED-100'
            };
        }
        if (/shop|spree|mall|clothes|zara/.test(t)) {
            return {
                emoji: '🛍️💳',
                desc: 'A fun shopping spree where I carry all your bags, cheer your outfit choices, and buy your favorite item! 👗✨',
                code: 'CODE: SHOPPING-SPREE-VIP'
            };
        }
        if (/spa|massage|relax|pamper/.test(t)) {
            return {
                emoji: '💆‍♀️🫧',
                desc: 'A full relaxation session with gentle massage, soothing aromatherapy, and complete pampering to melt away all stress! 🌸',
                code: 'CODE: RELAX-SPA-PASS'
            };
        }

        const customTitle = title ? title.trim() : 'Special Birthday Surprise';
        return {
            emoji: this.matchEmojiSemantically(customTitle),
            desc: `Valid 24/7! One unconditional pass for ${customTitle} whenever you want. Redeemable anytime with love and guaranteed happiness! ✨`,
            code: defaultCode
        };
    }

    async enhanceText(originalText, contextType = 'Birthday Wish', tone = this.selectedTone) {
        if (!originalText || !originalText.trim()) {
            throw new Error('Please write some text first so AI can polish it! ✨');
        }

        const prompt = `System: You are an internal text polisher and aesthetic editor for a modern birthday website.
Task: Polish the user's draft text.
Instructions:
1. Fix any spelling mistakes, typos, slang errors, or awkward phrasing (e.g. "pyari" -> "pyaari", "hasti rh" -> "hansti raho", "bday" -> "Birthday", "gr8" -> "great").
2. If written in Hindi or Hinglish (e.g. "meri pyari jaan", "khush reh hamesha", "tu sabse best hai"), preserve and enrich the natural Hinglish sentiment.
3. Apply the desired emotional tone: "${tone}" (options: Romantic, Bestie, Warm, Poetic).
4. Add cute, aesthetic, expressive emojis (like 🎂, ✨, 💖, 🌸, 🥂, 🥺, 🎉, 🌟, 🎈, 🥰) in appropriate places.
5. Context: ${contextType}.
6. CRITICAL OUTPUT FORMAT: Return ONLY the final polished text. Do NOT wrap in quotes. Do NOT provide options or conversational preamble.

User draft:
${originalText.trim()}`;

        const payload = {
            contents: [{
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024
            }
        };

        let lastError = null;

        // Try models with a 6-second timeout so user never gets stuck
        for (const model of this.models) {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 6000);

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    signal: controller.signal,
                    body: JSON.stringify(payload)
                });
                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    console.warn(`Model ${model} returned HTTP ${response.status}:`, errData);
                    lastError = new Error(errData?.error?.message || `HTTP ${response.status}`);
                    continue;
                }

                const data = await response.json();
                const candidate = data.candidates?.[0];
                const rawOutput = candidate?.content?.parts?.[0]?.text;

                if (rawOutput) {
                    return this.cleanText(rawOutput);
                }
            } catch (err) {
                console.warn(`Fetch error with model ${model}:`, err);
                lastError = err;
            }
        }

        // Graceful polish fallback if internet drops or API quota is limited
        return this.localPolishFallback(originalText, contextType);
    }

    // Local fallback polisher to prevent UI freeze
    localPolishFallback(text, contextType) {
        let polished = text.trim();
        // Capitalize first letter
        polished = polished.charAt(0).toUpperCase() + polished.slice(1);
        if (!polished.endsWith('.') && !polished.endsWith('!') && !polished.endsWith('?')) {
            polished += '!';
        }
        // Add pleasant emojis based on context
        if (contextType.includes('Reward') || contextType.includes('Coupon')) {
            if (!polished.includes('✨') && !polished.includes('🎉')) {
                polished += ' ✨🎁';
            }
        } else {
            if (!polished.includes('💖') && !polished.includes('🎂')) {
                polished += ' 💖🎂✨';
            }
        }
        return polished;
    }
}

// Global instance for browser usage
window.geminiAssistant = new GeminiBirthdayAssistant();
