---
title: Spring Security ve MySQL ile JWT Authentication
slug: spring-security-ve-mysql-ile-jwt-authentication
description: 'Spring security ve mysql kullanarak jwt authentication rehberi.'
date: 2020-08-05T11:07:34Z
preview: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
---

JWT tarafların birbirleri arasındaki veri alışverişini ve bunun doğrulamasını sağlayan JSON tabanlı açık bir standarttır.

JWT kullanmanın en yaygın senaryosu kullanıcı oturum açmak için servera kullanıcı adı ve şifre ile bir istek gönderir, kullanıcı adı ve şifre doğruysa server kullanıcıya bir JWT geri döndürür. Kullanıcı oturum açtıktan sonra, sonraki her istek authorization headerda JWT’yi içerecek ve kullanıcının bu belirteçle izin verilen rotalara, hizmetlere ve kaynaklara erişmesine izin verecektir.

JWT hakkında daha çok detay ve demo için [jwt.io](https://jwt.io/) adresini ziyaret edebilirsiniz.

![Spring Boot JWT](/media/2020-08-05-spring-security-ve-mysql-ile-jwt-authentication/1.jpeg)

Öncelikle application.properties dosyamıza veritabanı bilgilerimizi girdikten sonra şimdilik gerekli olan dependencyleri projemize ekleyelim.

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
   <scope>runtime</scope>
</dependency>
```

Şimdi bir User modeli oluşturalım ve veritabanı işlemlerinden sorumlu User repositorysi oluşturalım.

**User.java**

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```

**UserRepository.java**

```java
public interface UserRepository extends JpaRepository<User, Integer> {
    User findUserByUsername(String username);
}
```

Bu repositorymiz JpaRepository’i extend ettiği için temel veritabanı işlemlerini (Save(), Update(), Delete()) içerisinde barındırıyor. Biz ekstradan veritabanından kullanıcı adına göre kullanıcıyı getirmek için bir method ekliyoruz.
Şimdi Spring Security tarafından kullanılacak olan UserDetails’i implement eden ApplicationUserDetails ve UserDetailsService’i implement eden ApplicationUserDetailsService classlarını oluşturalım.

**ApplicationUserDetails.java**

```java
public class ApplicationUserDetails implements UserDetails {
    private User user;

    public ApplicationUserDetails(User user){
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
```

**ApplicationUserDetailsService.java**

```java
@Service
public class ApplicationUserDetailsService implements UserDetailsService {
    private UserRepository userRepository;

    @Autowired
    public ApplicationUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(s);
        if(user == null) throw new UsernameNotFoundException(s);
        return new ApplicationUserDetails(user);
    }
}
```

Burada UserDetailsService interface i loadUserByUsername methodunu içermekte. UserRepository i kullanarak bu methoda gönderilen kullanıcı adına göre veritabanından kullanıcıyı çekip ApplicationUserDetails nesnesini geri döndürüyoruz.

Şimdi sıra JWT kütüphanemizi projemize eklemeye geldi. JWT kütüphanesi olarak JJWT kullanacağız.

```xml
<dependency>
   <groupId>io.jsonwebtoken</groupId>
   <artifactId>jjwt-api</artifactId>
   <version>0.11.2</version>
</dependency>

<dependency>
   <groupId>io.jsonwebtoken</groupId>
   <artifactId>jjwt-impl</artifactId>
   <version>0.11.2</version>
   <scope>runtime</scope>
</dependency>

<dependency>
   <groupId>io.jsonwebtoken</groupId>
   <artifactId>jjwt-jackson</artifactId>
   <version>0.11.2</version>
   <scope>runtime</scope>
</dependency>
```

JWT işlemlerimizi gerçekleştireceğimiz JwtUtil adında bir service oluşturalım.

**JwtUtil.java**

```java
@Service
public class JwtUtil {
    private final SecretKey SECRET_KEY;

    public JwtUtil() {
        SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) //10 saat
                .signWith(SECRET_KEY).compact();
    }

    public String getSubject(String token) {
        return parseClaims(token).getSubject();
    }

    private Date getExpiration(String token) {
        return parseClaims(token).getExpiration();
    }

    private boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY).build()
                .parseClaimsJws(token).getBody();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getSubject(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}
```

Şimdi servera JWT token ile her istek gönderdiğimizde tokenımızı kontrol ederek kullanıcıya yetki verecek olan filterımızı yazalım.

**JwtFilter.java**

```java
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final ApplicationUserDetailsService applicationUserDetailsService;

    @Autowired
    public JwtFilter(JwtUtil jwtUtil, ApplicationUserDetailsService applicationUserDetailsService) {
        this.jwtUtil = jwtUtil;
        this.applicationUserDetailsService = applicationUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String tokenHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            token = tokenHeader.substring(7);
            username = jwtUtil.getSubject(token);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.applicationUserDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                        = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        chain.doFilter(request, response);
    }
}
```

Kullanıcının servera istek gönderirken kullanacağı AuthenticationRequest ve serverın oluşturular JWT yi kullanıcıya geri döndürmesi için kullanacağı AuthenticationResponse nesnelerini oluşturalım.

**AuthenticationRequest.java**

```java
public class AuthenticationRequest{
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```

**AuthenticationResponse.java**

```java
public class AuthenticationResponse {
    private final String token;

    public AuthenticationResponse(String token){
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
```

Artık controllerlarımızı yazabiliriz. Uygulamamız 3 tane endpoint içerecek. `/hello`, `/authenticate` ve `/register`.

**HelloController.java**

```java
@RestController
@RequestMapping("/hello")
public class HelloController {
    @GetMapping
    public String getHello(){
        return "Hello World";
    }
}
```

Buradaki `/hello` endpointine sadece giriş yapmış olan kullanıcılar erişebilecek.

**AuthenticationController.java**

```java
@RestController
public class AuthenticationController {

    private AuthenticationManager authenticationManager;
    private ApplicationUserDetailsService applicationUserDetailsService;
    private JwtUtil jwtUtil;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager,
                                    ApplicationUserDetailsService applicationUserDetailsService,
                                    JwtUtil jwtUtil,
                                    UserRepository userRepository,
                                    PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.applicationUserDetailsService = applicationUserDetailsService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()));
        }catch (BadCredentialsException e){
            throw new Exception("Incorrect Username or Password", e);
        }

        UserDetails userDetails = applicationUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        String token = jwtUtil.generateToken(userDetails.getUsername());

        return ResponseEntity.ok(new AuthenticationResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User Created");
    }
}
```

Buradaki `/authenticate` endpointi kullanıcı adı ve şifresi gönderilen kullanıcıyı kontrol ederek eğer bilgileri doğruysa o kullanıcıyı giriş yaptıracak. `/register` endpointi yeni bir kullanıcı kayıt edecek. Bu 2 endpointede giriş yapmadan erişilebilecek.

Artık son olarak security konfigürasyonumuzu yazabiliriz.

**SecurityConfiguration.java**

```java
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private ApplicationUserDetailsService userDetailsService;
    private JwtFilter jwtFilter;

    @Autowired
    public SecurityConfiguration(ApplicationUserDetailsService userDetailsService, JwtFilter jwtFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtFilter = jwtFilter;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests().antMatchers("/authenticate", "/register").permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
```

Burada `/authenticate` ve `/register` endpointlerine herkesin ulaşabileceğini fakat diğer endpointlere sadece giriş yapanların ulaşabileceğini Spring Security'e belirtiyoruz.

Sonra daha önce oluşturduğumuz JwtFilterımızı ekliyoruz.

Ek olarak kullanıcı şifrelerimizi hashleyebileceğimiz bir PasswordEncoder oluşturuyoruz.

Uygulamamız bitti artık postman’e girip uygulamamızı test edebiliriz.

![2](/media/2020-08-05-spring-security-ve-mysql-ile-jwt-authentication/2.png)

Buradada görüldüğü gibi `/hello` endpointine giriş yapmadan ulaşamıyoruz.

Öncelikle `/register` endpointini kullanarak yeni bir kullanıcı oluşturalım.

![3](/media/2020-08-05-spring-security-ve-mysql-ile-jwt-authentication/3.png)

Şimdi `/authenticate` endpointini kullanarak giriş yapalım ve tokenımızı alalım.

![4](/media/2020-08-05-spring-security-ve-mysql-ile-jwt-authentication/4.png)

Artık tokenımızı kullanarak `/hello` endpointine ulaşabiliriz.

![5](/media/2020-08-05-spring-security-ve-mysql-ile-jwt-authentication/5.png)

Uzun bir yazının sonuna geldik umarım faydalı olmuştur. Okuduğunuz için teşekkürler.

Github: [Spring-Boot-JWT-Authentication](https://github.com/artuncolak/Spring-Boot-JWT-Authentication)
