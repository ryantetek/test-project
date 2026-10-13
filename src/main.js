import './style.css'
import { supabase } from './supabase.js'

const form = document.querySelector('#add-form')
const titleInput = document.querySelector('#title')
const dueInput = document.querySelector('#due')
const list = document.querySelector('#list')
const status = document.querySelector('#status')

function showError(error) {
  status.textContent = error.message
  console.error(error)
}

async function loadReminders() {
  const { data, error } = await supabase
    .from('reminders')
    .select('*')
    .order('done')
    .order('due_at', { nullsFirst: false })
  if (error) return showError(error)
  status.textContent = data.length ? '' : 'No reminders yet.'
  render(data)
}

function render(reminders) {
  list.replaceChildren(
    ...reminders.map((r) => {
      const li = document.createElement('li')
      if (r.done) li.classList.add('done')

      const check = document.createElement('input')
      check.type = 'checkbox'
      check.checked = r.done
      check.addEventListener('change', () => toggleDone(r.id, check.checked))

      const text = document.createElement('span')
      text.textContent = r.title

      const due = document.createElement('small')
      if (r.due_at) {
        due.textContent = new Date(r.due_at).toLocaleString()
        if (!r.done && new Date(r.due_at) < new Date()) due.classList.add('overdue')
      }

      const del = document.createElement('button')
      del.textContent = '✕'
      del.title = 'Delete'
      del.addEventListener('click', () => deleteReminder(r.id))

      li.append(check, text, due, del)
      return li
    })
  )
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const { error } = await supabase.from('reminders').insert({
    title: titleInput.value.trim(),
    due_at: dueInput.value ? new Date(dueInput.value).toISOString() : null,
  })
  if (error) return showError(error)
  form.reset()
  loadReminders()
})

async function toggleDone(id, done) {
  const { error } = await supabase.from('reminders').update({ done }).eq('id', id)
  if (error) return showError(error)
  loadReminders()
}

async function deleteReminder(id) {
  const { error } = await supabase.from('reminders').delete().eq('id', id)
  if (error) return showError(error)
  loadReminders()
}

loadReminders()
