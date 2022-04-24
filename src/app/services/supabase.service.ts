import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { WorkItem } from '../types/work-item';
import { Tech } from '../types/tech';
import { Company } from '../types/company';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabaseClient!: SupabaseClient;

  constructor() {
    this.initializeSupabase();
  }

  private initializeSupabase() {
    this.supabaseClient = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_ANON_API_KEY
    );
  }

  getWorks() {
    return this.supabaseClient
      .from<WorkItem>('works')
      .select('*')
      .order('created_at', { ascending: true });
  }

  getCompanies() {
    return this.supabaseClient
      .from<Company>('companies')
      .select('*')
      .order('created_at', { ascending: true });
  }

  getTechs() {
    return this.supabaseClient
      .from<Tech>('techs')
      .select('*')
      .order('created_at', { ascending: true });
  }
}
