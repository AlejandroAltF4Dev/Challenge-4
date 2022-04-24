import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabaseClient!: SupabaseClient;

  constructor() {
    this.initializeSupabase();
  }

  private initializeSupabase() {
    this.supabaseClient = createClient("https://gqkuommdmfzmwkzdewma.supabase.co",
      process.env['SUPABASE_KEY'], {
        headers: {
          Authorization: `Bearer ${process.env['AUTH_TOKEN']}`
        }
      });
  }

  getSteam(params = {page: 0, limit: 6, search: '', sortBy: ''}) {
    const start = params.page * params.limit;
    const end = start + params.limit - 1;
    const query = this.supabaseClient
      .from<any>('steam')
      .select('*')
      .range(start, end)
      .limit(params.limit);


    if (params.sortBy) {
      query.order(params.sortBy)
    }
    if (params.search) {
      query.ilike('title', `%${params.search}%`)
    }
    return query;


  }
}
