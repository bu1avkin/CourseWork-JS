import { Route, Navigate } from "react-router-dom";
import AuthService from '../services/auth.service';

function ProtectedRoute({ roles = [], ...props }) {
    const user = AuthService.getCurrentUser();

    if (!user) {
        // Если пользователь не авторизован, перенаправляем его на страницу входа
        return <Navigate to="/login" />;
    }

    if (roles.length && !roles.some((role) => user.roles.includes(role))) {
        // Если у маршрута есть ограничения по ролям, и у пользователя нет ни одной из них,
        // перенаправляем его на страницу ошибки прав доступа
        return <Navigate to="/access-denied" />;
    }

    // Если все проверки пройдены, рендерим маршрут
    return <Route {...props} />;
}

export default ProtectedRoute;
