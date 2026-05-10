import pg from 'pg'
import fs from 'fs'
import readline from 'readline'

const { Pool } = pg

const PROJECT_REF = 'ngwgchwbxgdwixhztcbc'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve))
}

async function main() {
  console.log('\n🚀 Union Merch — настройка базы данных\n')

  const password = await ask('Введи пароль от базы данных Supabase: ')
  rl.close()

  const connectionString = `postgresql://postgres.${PROJECT_REF}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })

  try {
    console.log('\n⏳ Подключаемся к базе данных...')
    await pool.query('SELECT 1')
    console.log('✅ Подключились успешно!\n')

    console.log('⏳ Создаём таблицы...')
    const schema = fs.readFileSync('./supabase/schema.sql', 'utf8')
    await pool.query(schema)
    console.log('✅ Таблицы созданы!\n')

    console.log('⏳ Добавляем тестовые данные...')
    const seed = fs.readFileSync('./supabase/seed.sql', 'utf8')
    await pool.query(seed)
    console.log('✅ Тестовые данные добавлены!\n')

    console.log('🎉 База данных готова! Открывай http://localhost:3000\n')
  } catch (err) {
    console.error('\n❌ Ошибка:', err.message)
    if (err.message.includes('password')) {
      console.error('   Проверь правильность пароля\n')
    }
  } finally {
    await pool.end()
  }
}

main()
