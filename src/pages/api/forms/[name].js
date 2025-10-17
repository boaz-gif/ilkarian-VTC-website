/**
 * /api/forms/[name].js
 * Fetches form schema (fields, metadata) dynamically from Supabase
 * Includes robust error handling and debug logs.
 */

import { createClient } from '@supabase/supabase-js'

// ✅ Environment Variables (Set these in Vercel)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Initialize client (anon key OK for read-only)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  const { name } = req.query
  const requestId = Math.random().toString(36).substring(2, 9) // for tracing

  console.log(`🟢 [${requestId}] Request received for form:`, name)

  try {
    if (!name) {
      console.error(`🔴 [${requestId}] Missing form name parameter`)
      return res.status(400).json({ error: 'Missing form name parameter' })
    }

    // 1️⃣ Fetch form metadata
    const { data: form, error: formError } = await supabase
      .from('forms')
      .select('*')
      .eq('name', name)
      .single()

    if (formError || !form) {
      console.error(`🔴 [${requestId}] Form not found or query error:`, formError)
      return res.status(404).json({
        error: 'Form not found',
        details: formError?.message || 'No form with that name'
      })
    }

    // 2️⃣ Fetch related fields
    const { data: fields, error: fieldsError } = await supabase
      .from('form_fields')
      .select('name,label,field_type,required,options,placeholder,order')
      .eq('form_id', form.id)
      .order('order', { ascending: true })

    if (fieldsError) {
      console.error(`🔴 [${requestId}] Error fetching fields:`, fieldsError)
      return res.status(500).json({ error: 'Error fetching fields', details: fieldsError.message })
    }

    if (!fields || fields.length === 0) {
      console.warn(`🟡 [${requestId}] Form has no defined fields`)
    }

    // 3️⃣ Construct final schema object
    const schema = {
      name: form.name,
      title: form.title,
      description: form.description,
      version: form.version,
      active: form.active,
      fields
    }

    console.log(`✅ [${requestId}] Form schema fetched successfully.`)
    res.status(200).json(schema)
  } catch (err) {
    console.error(`🔥 [${requestId}] Unexpected error:`, err)
    res.status(500).json({
      error: 'Unexpected server error',
      details: err.message
    })
  }
}
