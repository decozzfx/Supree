import { createClient } from "@supabase/supabase-js";
import { API_HOST, SUPABASE_KEY } from "src/constants/config";
import "react-native-url-polyfill/auto";

const supabase = createClient(API_HOST as string, SUPABASE_KEY as string);

export default supabase;
