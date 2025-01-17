import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./coding_challenge.db');

export default db;
