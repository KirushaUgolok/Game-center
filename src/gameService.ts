import { query } from './database';

export async function saveGameState(telegramId: string, gameState: object) {
    const text = `
        INSERT INTO game_saves (telegram_id, game_state)
        VALUES ($1, $2)
        ON CONFLICT (telegram_id)
        DO UPDATE SET game_state = $2;
    `;
    await query(text, [telegramId, gameState]);
}

export async function loadGameState(telegramId: string) {
    const res = await query('SELECT game_state FROM game_saves WHERE telegram_id = $1', [telegramId]);
    return res.rows[0]?.game_state || null;
}
