import { supabase } from './supabaseClient';

export const createOrder = async (orderData, cartItems) => {
  if (!supabase) {
    console.warn('Supabase not configured. Simulating success...');
    return { data: { id: 'DEMO-' + Math.floor(Math.random() * 1000) }, error: null };
  }

  try {
    // 1. Insert into 'orders' table
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Prepare items with the new order_id
    const itemsToInsert = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.title,
      product_image: item.image,
      price: item.price,
      quantity: item.quantity
    }));

    // 3. Insert into 'order_items' table
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsToInsert);

    if (itemsError) throw itemsError;

    return { data: order, error: null };
  } catch (error) {
    console.error('Error in createOrder:', error);
    return { data: null, error };
  }
};

export const getUserOrders = async (userId) => {
  if (!supabase) return { data: [], error: 'Supabase not configured' };

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
};
