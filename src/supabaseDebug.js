// supabaseDebug.js - Comprehensive Supabase Debugging Utility

class SupabaseDebugger {
  constructor(supabase, options = {}) {
    this.supabase = supabase;
    this.enableLogging = options.enableLogging !== false;
    this.enableNetworkLogging = options.enableNetworkLogging !== false;
    this.logLevel = options.logLevel || 'all'; // 'all', 'errors', 'warnings'
  }

  // Check Supabase connection and configuration
  async checkConnection() {
    console.group('🔍 Supabase Connection Check');
    
    try {
      // 1. Check if Supabase client exists
      if (!this.supabase) {
        console.error('❌ Supabase client not initialized');
        return false;
      }
      console.log('✅ Supabase client exists');

      // 2. Check URL
      const url = this.supabase.supabaseUrl;
      console.log('🔗 Supabase URL:', url);
      
      // 3. Check if anon key is present (don't log the actual key)
      const hasKey = !!this.supabase.supabaseKey;
      console.log('🔑 Anon key present:', hasKey);

      // 4. Test connection with a simple query
      console.log('🧪 Testing connection...');
      const { error } = await this.supabase
        .from('applications')
        .select('count', { count: 'exact', head: true });

      if (error) {
        console.error('❌ Connection test failed:', error);
        this.analyzeError(error);
        return false;
      }
      
      console.log('✅ Connection successful');
      console.groupEnd();
      return true;

    } catch (err) {
      console.error('❌ Connection check failed:', err);
      console.groupEnd();
      return false;
    }
  }

  // Check RLS policies
  async checkRLSPolicies(tableName = 'applications') {
    console.group('🛡️ RLS Policy Check');
    
    try {
      console.log(`Checking policies for table: ${tableName}`);

      // Test SELECT
      const { error: selectError } = await this.supabase
        .from(tableName)
        .select('*')
        .limit(1);

      console.log('📖 SELECT permission:', selectError ? '❌ DENIED' : '✅ ALLOWED');
      if (selectError) this.analyzeError(selectError);

      // Test INSERT (without actually inserting)
      const testData = { test_field: 'test_value' };
      const { error: insertError } = await this.supabase
        .from(tableName)
        .insert([testData])
        .select();

      console.log('✏️ INSERT permission:', insertError ? '❌ DENIED' : '✅ ALLOWED');
      if (insertError) this.analyzeError(insertError);

      // If insert worked, delete the test record
      if (!insertError) {
        console.warn('⚠️ Test insert succeeded - you may need to clean up test data');
      }

      console.groupEnd();
      return !insertError;

    } catch (err) {
      console.error('❌ RLS check failed:', err);
      console.groupEnd();
      return false;
    }
  }

  // Detailed error analysis
  analyzeError(error) {
    console.group('🔬 Error Analysis');
    
    console.log('Error object:', error);
    
    if (error.code) {
      console.log('Error code:', error.code);
      
      const errorGuide = {
        '401': '🔐 Unauthorized - Check your API key or RLS policies',
        '403': '🚫 Forbidden - RLS policy blocking this action',
        '404': '❓ Not Found - Table or endpoint doesn\'t exist',
        '500': '💥 Server Error - Check Supabase logs',
        'PGRST116': '🔐 JWT expired - User needs to re-authenticate',
        'PGRST301': '🚫 RLS policy violation - Check your policies',
        '42501': '🔒 Insufficient privilege - RLS blocking action'
      };

      const guidance = errorGuide[error.code] || '❓ Unknown error code';
      console.log('Guidance:', guidance);
    }

    if (error.message) {
      console.log('Error message:', error.message);
      
      // Check for common issues
      if (error.message.includes('JWT')) {
        console.warn('⚠️ Authentication issue detected. User may need to sign in.');
      }
      
      if (error.message.includes('policy')) {
        console.warn('⚠️ RLS policy issue. Check your database policies.');
        console.log('💡 Tip: Go to Supabase Dashboard → Authentication → Policies');
      }
      
      if (error.message.includes('violates')) {
        console.warn('⚠️ Constraint violation. Check your data format.');
      }
    }

    if (error.details) {
      console.log('Error details:', error.details);
    }

    if (error.hint) {
      console.log('💡 Hint:', error.hint);
    }

    console.groupEnd();
  }

  // Wrap database operations with logging
  async loggedOperation(operation, operationName) {
    console.group(`📊 ${operationName}`);
    console.time(`⏱️ ${operationName} duration`);

    try {
      const { data, error, status, } = await operation;

      console.timeEnd(`⏱️ ${operationName} duration`);
      
      if (error) {
        console.error(`❌ ${operationName} failed`);
        this.analyzeError(error);
        console.groupEnd();
        return { data: null, error };
      }

      console.log(`✅ ${operationName} successful`);
      console.log('Response status:', status);
      console.log('Data received:', data);
      console.groupEnd();
      return { data, error: null };

    } catch (err) {
      console.timeEnd(`⏱️ ${operationName} duration`);
      console.error(`❌ ${operationName} threw exception:`, err);
      console.groupEnd();
      return { data: null, error: err };
    }
  }

  // Monitor network requests (call this once on app init)
  setupNetworkMonitoring() {
    if (!this.enableNetworkLogging) return;

    console.log('🌐 Network monitoring enabled for Supabase requests');

    // Intercept fetch if you want deeper monitoring
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [url, config] = args;
      
      // Only log Supabase requests
      if (url.toString().includes('supabase.co')) {
        console.group('🌐 Supabase Network Request');
        console.log('URL:', url);
        console.log('Method:', config?.method || 'GET');
        
        // Log headers (excluding sensitive data)
        if (config?.headers) {
          const headers = { ...config.headers };
          if (headers.Authorization) {
            headers.Authorization = 'Bearer [HIDDEN]';
          }
          if (headers.apikey) {
            headers.apikey = '[HIDDEN]';
          }
          console.log('Headers:', headers);
        }
        
        console.log('Body:', config?.body);
        console.groupEnd();
      }
      
      return originalFetch(...args);
    };
  }

  // Quick diagnostic report
  async runDiagnostics() {
    console.log('🏥 Running Supabase Diagnostics...\n');
    
    const results = {
      connection: await this.checkConnection(),
      rlsPolicies: await this.checkRLSPolicies()
    };

    console.group('📋 Diagnostic Summary');
    console.log('Connection:', results.connection ? '✅ OK' : '❌ FAILED');
    console.log('RLS Policies:', results.rlsPolicies ? '✅ OK' : '❌ ISSUES DETECTED');
    
    if (!results.connection || !results.rlsPolicies) {
      console.warn('\n⚠️ ISSUES DETECTED - See detailed logs above');
      console.log('\n💡 Common Solutions:');
      console.log('1. Check your .env file has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
      console.log('2. Verify RLS policies in Supabase Dashboard');
      console.log('3. Ensure table "applications" exists');
      console.log('4. Check if you need authentication for this operation');
    } else {
      console.log('\n✅ All checks passed!');
    }
    
    console.groupEnd();
    return results;
  }
}

// Export for use
export default SupabaseDebugger;

// Usage example:
/*
import { supabase } from './supabaseClient';
import SupabaseDebugger from './supabaseDebug';

const debugger = new SupabaseDebugger(supabase, {
  enableLogging: true,
  enableNetworkLogging: true
});

// Run full diagnostics
await debugger.runDiagnostics();

// Check specific things
await debugger.checkConnection();
await debugger.checkRLSPolicies('applications');

// Wrap operations with logging
const result = await debugger.loggedOperation(
  supabase.from('applications').insert([applicationData]).select(),
  'Insert Application'
);
*/