import { createContext, useContext, useState, type ReactNode } from 'react';
import { creator, initialProducts, type Product } from '@/lib/store-data';
type Profile = { name: string; bio: string; email: string; username: string };
type AdminState = { products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>; profile: Profile; setProfile: React.Dispatch<React.SetStateAction<Profile>>; notifications: boolean[]; setNotifications: React.Dispatch<React.SetStateAction<boolean[]>>; announcement: string; setAnnouncement: (value: string) => void };
const Context = createContext<AdminState | null>(null);
export function AdminProvider({ children }: { children: ReactNode }) {
 const [products,setProducts] = useState(initialProducts);
 const [profile,setProfile] = useState({ name: creator.name, bio: creator.bio, email: 'emirhan@sety.store', username: creator.username });
 const [notifications,setNotifications] = useState([true,true,false]);
 const [announcement,setAnnouncement] = useState('Bu hafta tüm e-kitaplarda %20 indirim');
 return <Context.Provider value={{products,setProducts,profile,setProfile,notifications,setNotifications,announcement,setAnnouncement}}>{children}</Context.Provider>;
}
export function useAdmin() { const value = useContext(Context); if (!value) throw new Error('AdminProvider is required'); return value; }
