# Spec: Authentication & Role-Based Access Control (spec-auth-rbac-004)

**Priority**: HIGH | **Timeline**: Week 4-5 | **Team**: 1 Developer (Backend Focus)

---

## Objective

Implement complete authentication and role-based access control (RBAC) using WorkOS for SSO (Gmail and Microsoft), Laravel middleware for route protection, and role-based redirects. Users must be able to sign up/login via WorkOS, be assigned roles (Client, Owner, Admin), and be redirected to appropriate dashboards based on their role.

---

## Requirements

### Functional Requirements

1. **WorkOS Authentication Flow**
   - Login button on HomePage redirects to WorkOS
   - WorkOS handles Gmail and Microsoft SSO
   - Callback endpoint creates/updates user in database
   - Session cookie is set after successful authentication
   - User is redirected to appropriate dashboard based on role

2. **User Roles**
   - **Client**: Can search properties, make bookings, leave reviews
   - **Owner**: Can create/manage properties, view bookings
   - **Admin**: Can moderate properties, manage users, view analytics

3. **Protected Routes**
   - Public routes: HomePage, MapSearch, PropertyDetail, Login
   - Client routes: Client dashboard, bookings, profile
   - Owner routes: Owner dashboard, property management
   - Admin routes: Admin dashboard, user management, moderation

4. **Role-Based Redirects**
   - After login, redirect to appropriate dashboard based on role
   - Prevent unauthorized access to role-specific pages
   - Logout clears session and redirects to HomePage

5. **User Profile Management**
   - View/edit profile information
   - Change password (if applicable)
   - Delete account

### Technical Requirements

- **Framework**: Laravel 12 with Inertia.js
- **Authentication**: WorkOS SSO integration
- **Authorization**: Laravel middleware for role checking
- **Database**: User model with role field (enum: client, owner, admin)
- **Session**: Laravel session management with secure cookies
- **TypeScript**: React components with TypeScript
- **Testing**: Feature tests for authentication flow

---

## Design & Architecture

### Database Schema

**Users Table** (already exists, add role field):

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NULLABLE,
    role ENUM('client', 'owner', 'admin') DEFAULT 'client',
    login_method VARCHAR(50), -- 'workos', 'password'
    email_verified_at TIMESTAMP NULLABLE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULLABLE
);
```

### Laravel Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Auth/
│   │       ├── WorkOSController.php
│   │       └── LogoutController.php
│   ├── Middleware/
│   │   ├── EnsureUserRole.php
│   │   └── RedirectBasedOnRole.php
│   └── Requests/
│       └── Auth/
│           └── UpdateProfileRequest.php
├── Models/
│   └── User.php (with role methods)
└── Services/
    └── AuthService.php

routes/
├── web.php (auth routes)
└── middleware/ (role middleware)

resources/js/
├── Pages/
│   └── Auth/
│       ├── Login.tsx
│       └── Profile.tsx
└── Layouts/
    └── AuthLayout.tsx
```

### React Components

```typescript
// Login page with WorkOS button
// Profile page with user info
// Protected layout wrapper for authenticated pages
```

---

## Tasks

### Backend Tasks

- [ ] Add `role` column to users table (migration)
- [ ] Update User model with role methods (isClient, isOwner, isAdmin)
- [ ] Install WorkOS PHP package: `composer require workos/workos-php`
- [ ] Create WorkOSController with redirect and callback methods
- [ ] Configure WorkOS credentials in .env and config/services.php
- [ ] Create AuthService for user creation/update logic
- [ ] Create EnsureUserRole middleware for route protection
- [ ] Create RedirectBasedOnRole middleware for post-login redirect
- [ ] Register middleware in app/Http/Kernel.php
- [ ] Create protected routes for each role
- [ ] Create LogoutController for session cleanup
- [ ] Create ProfileController for user profile management
- [ ] Create UpdateProfileRequest validation
- [ ] Add feature tests for authentication flow
- [ ] Add tests for role-based route protection

### Frontend Tasks

- [ ] Create Login.tsx page with WorkOS button
- [ ] Create Profile.tsx page with user info and edit form
- [ ] Create AuthLayout.tsx wrapper for auth pages
- [ ] Create useAuth() hook for checking authentication state
- [ ] Create ProtectedRoute component for role-based access
- [ ] Add login/logout buttons to Header component
- [ ] Display user role in navigation
- [ ] Create role-specific navigation items
- [ ] Add TypeScript interfaces for User and Auth state
- [ ] Implement error handling for auth failures
- [ ] Add loading states during authentication
- [ ] Test authentication flow end-to-end

---

## Completion Criteria

- [ ] User can login via WorkOS (Gmail or Microsoft)
- [ ] User is created in database with correct role (default: client)
- [ ] Session cookie is set after successful login
- [ ] User is redirected to appropriate dashboard based on role
- [ ] Client dashboard is only accessible to clients
- [ ] Owner dashboard is only accessible to owners
- [ ] Admin dashboard is only accessible to admins
- [ ] Unauthorized users receive 403 error
- [ ] User can logout and session is cleared
- [ ] User profile page displays correct information
- [ ] User can edit profile information
- [ ] Navigation shows role-specific items
- [ ] WorkOS credentials are secure (in .env)
- [ ] Feature tests pass for all auth flows
- [ ] TypeScript compilation passes without errors
- [ ] No console errors or warnings
- [ ] Logout redirects to HomePage

---

## Implementation Notes

### WorkOS Integration Steps

1. **Create WorkOS Account**
   - Sign up at https://workos.com
   - Create OAuth application
   - Get API key and Client ID

2. **Configure Environment**
   ```env
   WORKOS_API_KEY=your_api_key
   WORKOS_CLIENT_ID=your_client_id
   WORKOS_REDIRECT_URI=http://localhost:8000/auth/workos/callback
   ```

3. **Install Package**
   ```bash
   composer require workos/workos-php
   ```

4. **Create Controller**
   ```php
   // See ANTIGRAVITY_CODE_SNIPPETS.md for WorkOSController example
   ```

### Middleware Implementation

```php
// EnsureUserRole middleware
public function handle(Request $request, Closure $next, string $role): mixed
{
    if (!$request->user() || $request->user()->role !== $role) {
        abort(403, 'Unauthorized');
    }
    return $next($request);
}

// Register in routes
Route::middleware(['auth', 'role:owner'])->group(function () {
    // Owner routes
});
```

### React Authentication Hook

```typescript
// useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user from Laravel
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, isAuthenticated: !!user };
};
```

### Role-Based Redirect

```php
// After WorkOS callback
private function redirectPath(User $user): string
{
    return match ($user->role) {
        'admin' => route('admin.dashboard'),
        'owner' => route('owner.dashboard'),
        default => route('client.dashboard'),
    };
}
```

---

## Testing Strategy

### Feature Tests

```php
// Test WorkOS login
test('user can login via workos', function () {
    $response = $this->get(route('auth.workos.callback', ['code' => 'test']));
    $this->assertAuthenticatedAs(User::first());
});

// Test role-based access
test('owner cannot access admin dashboard', function () {
    $owner = User::factory()->create(['role' => 'owner']);
    $response = $this->actingAs($owner)->get(route('admin.dashboard'));
    $response->assertStatus(403);
});
```

### Manual Testing

1. Click login button on HomePage
2. Authenticate with Gmail or Microsoft
3. Verify user is created in database
4. Verify user is redirected to correct dashboard
5. Try accessing unauthorized routes (should get 403)
6. Logout and verify session is cleared

---

## Resources

- WorkOS Documentation: https://workos.com/docs
- Laravel Authentication: https://laravel.com/docs/authentication
- Laravel Authorization: https://laravel.com/docs/authorization
- Inertia.js Auth: https://inertiajs.com/authentication

---

## Dependencies

- Laravel 12
- WorkOS PHP SDK
- Inertia.js
- React 19
- TypeScript

---

## Security Considerations

- Store WorkOS credentials in .env (never commit)
- Use secure session cookies (httpOnly, secure, sameSite)
- Validate user role on every protected request
- Log authentication events for audit trail
- Implement rate limiting on login endpoint
- Use HTTPS in production

---

**Spec Version**: 1.0  
**Created**: 2026-01-31  
**Status**: Pending Implementation  
**Depends On**: spec-ui-propertydetail-003
