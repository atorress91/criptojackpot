# 📊 Mapeo de Endpoints - Backend C# a Frontend React

## Microservicio: Identity API

### AuthController

| Método HTTP | Ruta Backend                         | Método Frontend                         | Archivo                                       |
| ----------- | ------------------------------------ | --------------------------------------- | --------------------------------------------- |
| POST        | `/api/v1/auth`                       | `authService.authenticate(credentials)` | [authService.ts](src/services/authService.ts) |
| POST        | `/api/v1/auth/confirm-email/{token}` | `authService.confirmEmail(token)`       | [authService.ts](src/services/authService.ts) |

### UserController

| Método HTTP | Ruta Backend                                     | Método Frontend                                | Archivo                                       |
| ----------- | ------------------------------------------------ | ---------------------------------------------- | --------------------------------------------- |
| POST        | `/api/v1/users`                                  | `userService.createUser(user)`                 | [userService.ts](src/services/userService.ts) |
| GET         | `/api/v1/users/{userId}`                         | `userService.getUserById(userId)`              | [userService.ts](src/services/userService.ts) |
| GET         | `/api/v1/users/get-all-users?excludeUserId={id}` | `userService.getAllUsers(excludeUserId)`       | [userService.ts](src/services/userService.ts) |
| PUT         | `/api/v1/users/{userId}`                         | `userService.updateUserAsync(userId, data)`    | [userService.ts](src/services/userService.ts) |
| PATCH       | `/api/v1/users/update-image-profile`             | `userService.updateImageProfile(request)`      | [userService.ts](src/services/userService.ts) |
| PATCH       | `/api/v1/users/generate-new-security-code`       | `userService.generateNewSecurityCode(request)` | [userService.ts](src/services/userService.ts) |
| POST        | `/api/v1/users/request-password-reset`           | `userService.requestPasswordReset(request)`    | [userService.ts](src/services/userService.ts) |
| POST        | `/api/v1/users/reset-password-with-code`         | `userService.resetPassword(request)`           | [userService.ts](src/services/userService.ts) |

### CountryController

| Método HTTP | Ruta Backend        | Método Frontend                    | Archivo                                             |
| ----------- | ------------------- | ---------------------------------- | --------------------------------------------------- |
| GET         | `/api/v1/countries` | `countryService.getAllCountries()` | [countryService.ts](src/services/countryService.ts) |

### RoleController

| Método HTTP | Ruta Backend    | Método Frontend             | Archivo                                       |
| ----------- | --------------- | --------------------------- | --------------------------------------------- |
| GET         | `/api/v1/roles` | `roleService.getAllRoles()` | [roleService.ts](src/services/roleService.ts) |

### UserReferralController

| Método HTTP | Ruta Backend                      | Método Frontend                                     | Archivo                                                       |
| ----------- | --------------------------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| GET         | `/api/v1/user-referrals/{userId}` | `userReferralService.GetUserReferralsAsync(userId)` | [userReferralService.ts](src/services/userReferralService.ts) |

---

## Microservicio: Lottery API

### LotteryController

| Método HTTP | Ruta Backend             | Método Frontend                              | Archivo                                             |
| ----------- | ------------------------ | -------------------------------------------- | --------------------------------------------------- |
| GET         | `/api/v1/lotteries`      | `lotteryService.getAllLotteries(pagination)` | [lotteryService.ts](src/services/lotteryService.ts) |
| GET         | `/api/v1/lotteries/{id}` | `lotteryService.getLotteryById(id)`          | [lotteryService.ts](src/services/lotteryService.ts) |
| POST        | `/api/v1/lotteries`      | `lotteryService.createLottery(data)`         | [lotteryService.ts](src/services/lotteryService.ts) |
| PUT         | `/api/v1/lotteries/{id}` | `lotteryService.updateLottery(id, data)`     | [lotteryService.ts](src/services/lotteryService.ts) |
| DELETE      | `/api/v1/lotteries/{id}` | `lotteryService.deleteLottery(id)`           | [lotteryService.ts](src/services/lotteryService.ts) |

### PrizeController

| Método HTTP | Ruta Backend                              | Método Frontend                         | Archivo                                         |
| ----------- | ----------------------------------------- | --------------------------------------- | ----------------------------------------------- |
| GET         | `/api/v1/prizes?PageNumber=1&PageSize=10` | `prizeService.getAllPrizes(pagination)` | [prizeService.ts](src/services/prizeService.ts) |
| GET         | `/api/v1/prizes/{id}`                     | `prizeService.getPrizeById(id)`         | [prizeService.ts](src/services/prizeService.ts) |
| POST        | `/api/v1/prizes`                          | `prizeService.createPrize(request)`     | [prizeService.ts](src/services/prizeService.ts) |
| PUT         | `/api/v1/prizes/{id}`                     | `prizeService.updatePrize(id, request)` | [prizeService.ts](src/services/prizeService.ts) |
| DELETE      | `/api/v1/prizes/{id}`                     | `prizeService.deletePrize(id)`          | [prizeService.ts](src/services/prizeService.ts) |

### LotteryNumberController ✨ NUEVO

| Método HTTP | Ruta Backend                                                      | Método Frontend                                                           | Archivo                                                         |
| ----------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------- |
| GET         | `/api/v1/lottery-numbers/{lotteryId}/available?count=10`          | `lotteryNumberService.getAvailableNumbers(lotteryId, count)`              | [lotteryNumberService.ts](src/services/lotteryNumberService.ts) |
| GET         | `/api/v1/lottery-numbers/{lotteryId}/check?number={n}&series={s}` | `lotteryNumberService.checkNumberAvailability(lotteryId, number, series)` | [lotteryNumberService.ts](src/services/lotteryNumberService.ts) |
| POST        | `/api/v1/lottery-numbers/{lotteryId}/reserve`                     | `lotteryNumberService.reserveNumbers(lotteryId, request)`                 | [lotteryNumberService.ts](src/services/lotteryNumberService.ts) |
| DELETE      | `/api/v1/lottery-numbers/release/{ticketId}`                      | `lotteryNumberService.releaseNumbers(ticketId)`                           | [lotteryNumberService.ts](src/services/lotteryNumberService.ts) |
| GET         | `/api/v1/lottery-numbers/{lotteryId}/stats`                       | `lotteryNumberService.getNumberStats(lotteryId)`                          | [lotteryNumberService.ts](src/services/lotteryNumberService.ts) |

---

## 🔄 Cómo Usar los Servicios

### 1. Importar desde Service Locator

```typescript
import { getUserService, getLotteryNumberService } from '@/di/serviceLocator';
```

### 2. Obtener Instancia del Servicio

```typescript
const userService = getUserService();
const lotteryNumberService = getLotteryNumberService();
```

### 3. Usar los Métodos

```typescript
// Ejemplo: Obtener usuario
const user = await userService.getUserById(123);

// Ejemplo: Reservar números de lotería
const result = await lotteryNumberService.reserveNumbers('lottery-123', {
  numbers: [
    { number: 42, series: 'A' },
    { number: 15, series: 'B' },
  ],
});
```

---

## 🌐 URLs Finales en Producción

Todas las llamadas apuntan a: **`https://api.cryptojackpot.com`**

El Ingress Controller se encarga de redirigir:

- `/api/v1/auth` → Identity API Pod
- `/api/v1/users` → Identity API Pod
- `/api/v1/lotteries` → Lottery API Pod
- `/api/v1/prizes` → Lottery API Pod
- `/api/v1/lottery-numbers` → Lottery API Pod

---

## ✅ Checklist de Verificación

- [x] Endpoints corregidos de singular a plural (`user` → `users`)
- [x] LotteryNumberService creado y registrado
- [x] Service Locator actualizado
- [x] Container DI actualizado
- [x] Variables de entorno configuradas
- [x] Documentación completa creada

¡Todo está listo para consumir los microservicios! 🚀
