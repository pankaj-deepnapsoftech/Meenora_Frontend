import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Edit, Trash2, UserPlus, Search, ChevronUp, ChevronDown, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog.jsx';
import { Label } from '@/components/ui/label.jsx';

const AdminCustomersTab = ({ customers: initialCustomers, setCustomers: setParentCustomers }) => {
  const [customers, setCustomersState] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });

  React.useEffect(() => {
    setCustomersState(initialCustomers);
  }, [initialCustomers]);


  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'user' });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      const updatedCustomers = customers.map(c => c.id === editingUser.id ? { ...c, ...formData } : c);
      setCustomersState(updatedCustomers);
      setParentCustomers(updatedCustomers); // Update parent state
      toast({ title: "User Updated", description: `User ${formData.name} has been updated.` });
    } else {
      // Add new user - This is simplified. Real app needs unique ID, password handling, etc.
      const newUser = { ...formData, id: Date.now().toString(), orders: 0, totalSpent: 0, joinDate: new Date().toISOString().split('T')[0] };
      const updatedCustomers = [newUser, ...customers];
      setCustomersState(updatedCustomers);
      setParentCustomers(updatedCustomers); // Update parent state
      toast({ title: "User Added", description: `User ${formData.name} has been added.` });
    }
    // Update localStorage for users_list
    const usersList = JSON.parse(localStorage.getItem('meenora_users_list') || '[]');
    if (editingUser) {
        const userIndex = usersList.findIndex(u => u.id === editingUser.id || u.email === editingUser.email);
        if (userIndex > -1) usersList[userIndex] = { ...usersList[userIndex], ...formData };
    } else {
        if (!usersList.find(u => u.email === formData.email)) {
            usersList.push({id: formData.id || Date.now().toString(), name: formData.name, email: formData.email, role: formData.role, password: "User123"}); // Add default password for mock
        }
    }
    localStorage.setItem('meenora_users_list', JSON.stringify(usersList));
    setIsModalOpen(false);
  };
  
  const handleDeleteUser = (userId, userName) => {
    toast({
      title: 'Confirm Deletion',
      description: `Are you sure you want to delete user "${userName}"? This action cannot be undone.`,
      action: (
        <Button variant="destructive" size="sm" onClick={() => {
          const updatedCustomers = customers.filter(c => c.id !== userId);
          setCustomersState(updatedCustomers);
          setParentCustomers(updatedCustomers); // Update parent state
          
          // Remove from meenora_users_list in localStorage
          let usersList = JSON.parse(localStorage.getItem('meenora_users_list') || '[]');
          usersList = usersList.filter(u => u.id !== userId && u.email !== customers.find(c => c.id === userId)?.email);
          localStorage.setItem('meenora_users_list', JSON.stringify(usersList));

          toast({ title: 'User Deleted', description: `User "${userName}" has been removed.` });
        }}>
          Yes, Delete
        </Button>
      ),
    });
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">
            Users & Roles Management
          </h1>
          <p className="text-muted-foreground text-lg">View and manage user accounts and their roles.</p>
        </div>
        <Button className="btn-primary" onClick={openAddModal}>
          <UserPlus className="h-5 w-5 mr-2" /> Add User
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 py-3 text-base"
        />
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Customer</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Role</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Orders</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Total Spent</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Join Date</th>
                  <th className="text-center p-4 font-semibold text-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div>
                        <h4 className="font-semibold text-foreground text-base">{customer.name}</h4>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </td>
                     <td className="p-4">
                      <Badge variant={customer.role === 'admin' ? 'destructive' : 'secondary'} className="capitalize font-medium">
                        {customer.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-foreground">{customer.orders}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-foreground">${customer.totalSpent.toFixed(2)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-muted-foreground text-sm">
                        {new Date(customer.joinDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => openEditModal(customer)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive" onClick={() => handleDeleteUser(customer.id, customer.name)}
                         disabled={customer.email === 'admin@meenora.in'} // Prevent deleting main admin
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCustomers.length === 0 && (
                <div className="text-center p-10 text-muted-foreground">
                  <Users className="mx-auto h-10 w-10 mb-2" />
                  No users found matching your search criteria.
                </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {editingUser ? `Update details for ${editingUser.name}.` : 'Enter the details for the new user.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3 border border-gray-300" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3 border border-gray-300" required disabled={!!editingUser} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <select id="role" name="role" value={formData.role} onChange={handleInputChange} className="col-span-3 input  border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md" disabled={formData.email === 'admin@meenora.in'}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            { !editingUser && (
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="passwordModal" className="text-right">Password</Label>
                    <Input id="passwordModal" name="password" type="password" placeholder="Default: User123" className="col-span-3" 
                    onChange={handleInputChange} />
                </div>
            )}
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
            <Button type="submit" className="btn-primary">{editingUser ? 'Save Changes' : 'Add User'}</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCustomersTab;