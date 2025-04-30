import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import SavedProperties from '@/components/profile/SavedProperties';
import ActivityHistory from '@/components/profile/ActivityHistory';
import { Shield, UserCircle, BookmarkIcon, ClockIcon, BellIcon, Upload, MapPin, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ContentTemplate } from '@/components/templates/ContentTemplate';
import { Textarea } from '@/components/ui/textarea';

const Profile = () => {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Initialize form values from user data
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setBio(user.bio || '');
      setAddress(user.address || '');
      setProfileImage(user.profileImage);
      setImagePreview(user.profileImage);
    }
  }, [user, isAuthenticated, navigate]);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await updateProfile({
        name,
        email,
        phone,
        bio,
        address,
        profileImage
      });
      
      if (success) {
        // No need to reload the page anymore since we're using context
        // Force a reload to update the displayed user info in the navbar
        // window.location.reload();
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    // Basic validation
    if (currentPassword.length < 6) {
      setPasswordError('Current password must be at least 6 characters');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Password updated successfully');
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmed) {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        toast.success('Account deleted successfully');
        
        // Log out the user and redirect to home page
        logout();
        navigate('/');
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Profile Hero Section */}
      <section className="bg-gradient-to-r from-estate-navy to-estate-darkBlue text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white/20 shadow-lg">
                {imagePreview ? (
                  <AvatarImage src={imagePreview} alt={user?.name || 'User'} />
                ) : (
                  <AvatarFallback className="text-xl bg-estate-gold text-estate-navy">
                    {getInitials(user?.name || '')}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-green-500 h-6 w-6 rounded-full border-2 border-white flex items-center justify-center">
                <span className="sr-only">Online</span>
              </div>
            </div>
            <div className="text-center md:text-left md:flex-1">
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <p className="text-white/80">{user?.email}</p>
              <p className="mt-2 text-white/60 text-sm">Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container-custom py-10">
        <Tabs defaultValue="profile" className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="properties" className="flex items-center gap-2">
                <BookmarkIcon className="h-4 w-4" />
                <span>Saved</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span>Activity</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <BellIcon className="h-4 w-4" />
                <span>Preferences</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="profile">
            <ContentTemplate variant="profile" className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Your Profile Information</h2>
              <Separator className="mb-6" />
              
              <form onSubmit={handleProfileUpdate}>
                <div className="space-y-6">
                  {/* Profile Image Upload */}
                  <div className="flex flex-col items-center sm:items-start space-y-4">
                    <Label htmlFor="profile-image" className="text-base">Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20 border">
                        {imagePreview ? (
                          <AvatarImage src={imagePreview} alt={name} />
                        ) : (
                          <AvatarFallback className="bg-primary/10">
                            <User className="h-8 w-8 text-primary" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <Label 
                          htmlFor="profile-image" 
                          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 transition-colors rounded-md text-primary"
                        >
                          <Upload className="h-4 w-4" />
                          Upload Image
                        </Label>
                        <Input 
                          id="profile-image" 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange} 
                          className="hidden" 
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG, or GIF. Max size 5MB.
                        </p>
                      </div>
                    </div>
                  </div>
                
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base">Phone Number (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base">Address (optional)</Label>
                    <div className="relative">
                      <Input
                        id="address"
                        type="text"
                        placeholder="Your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="h-12 pl-10"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-base">Bio (optional)</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us a little about yourself"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Brief description for your profile. This will be visible to other users.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="h-12 px-6 w-full sm:w-auto"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </form>
            </ContentTemplate>
          </TabsContent>
          
          <TabsContent value="properties">
            <ContentTemplate variant="dashboard" className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Your Saved Properties</h2>
              <Separator className="mb-6" />
              <SavedProperties />
            </ContentTemplate>
          </TabsContent>
          
          <TabsContent value="activity">
            <ContentTemplate variant="dashboard" className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Your Recent Activity</h2>
              <Separator className="mb-6" />
              <ActivityHistory />
            </ContentTemplate>
          </TabsContent>
          
          <TabsContent value="security">
            <ContentTemplate variant="profile" className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
              <Separator className="mb-6" />
              
              <form onSubmit={handlePasswordChange}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-base">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-base">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-base">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  {passwordError && (
                    <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md">
                      {passwordError}
                    </div>
                  )}
                  
                  <div className="pt-4 flex flex-col sm:flex-row justify-between gap-4">
                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      className="h-12"
                    >
                      Delete Account
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="h-12 px-6"
                    >
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </div>
              </form>
            </ContentTemplate>
          </TabsContent>
          
          <TabsContent value="preferences">
            <ContentTemplate variant="gradient" className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
              <Separator className="mb-6" />
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <h3 className="text-lg font-medium mb-2">Communication Settings</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Manage how you receive notifications and updates from Estate Vision
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-md transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <BellIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                      </div>
                      <input type="checkbox" id="email-notifications" className="h-5 w-5" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-md transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <BookmarkIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Property Updates</p>
                          <p className="text-sm text-muted-foreground">Updates about saved properties</p>
                        </div>
                      </div>
                      <input type="checkbox" id="property-updates" className="h-5 w-5" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-md transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">News and Offers</p>
                          <p className="text-sm text-muted-foreground">Promotional emails and newsletters</p>
                        </div>
                      </div>
                      <input type="checkbox" id="news-offers" className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button type="button" className="h-12 px-6">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </ContentTemplate>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center bg-estate-lightBlue p-4 rounded-lg shadow-inner">
          <p className="text-sm text-muted-foreground">
            Need help with your account? <a href="#" className="text-primary font-medium hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile; 